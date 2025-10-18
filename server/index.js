const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bit2byte-events',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    use_filename: true, 
    unique_filename: false,
  },
});
const upload = multer({ storage: storage });


// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected...');
    seedAdminUsers();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- Schemas and Models ---
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  venue: { type: String, required: true },
  supportEmail: { type: String, required: true },
  contactPhone: { type: String },
  eventTypes: [{ type: String }],
  externalLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { 
    type: String,
    enum: ['upcoming', 'completed'],
    default: 'upcoming',
  },
}, { timestamps: true });
const Event = mongoose.model('Event', EventSchema);

const LinkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
});
const Link = mongoose.model('Link', LinkSchema);

// --- Seeding Admin Users ---
const seedAdminUsers = async () => {
  try {
    const users = [{ username: 'Rupankar', password: 'rup1234' }, { username: 'Nanda', password: 'nanda1234' }];
    for (const userData of users) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const newUser = new User({ username: userData.username, password: hashedPassword });
        await newUser.save();
        console.log(`Admin user '${userData.username}' created successfully.`);
      }
    }
  } catch (error) {
    console.error('Error seeding admin users:', error);
  }
};

// ** Authentication Middleware **
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// --- API Routes ---

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials. Please try again.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. Please try again.' });
    const payload = { user: { id: user.id, username: user.username } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Image Upload Route (protected)
app.post('/api/upload', auth, upload.single('eventImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded.' });
    }
    res.status(200).json({ imageUrl: req.file.path });
});

// Create Event Route (protected)
app.post('/api/events', auth, async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const event = await newEvent.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get ALL events (for admin dashboard, protected)
app.get('/api/events', auth, async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// ** FIXED: Get UPCOMING events (public) **
app.get('/api/events/upcoming', async (req, res) => {
    try {
        const events = await Event.find({
            status: 'upcoming',
            eventDate: { $gte: new Date() } // **LOGIC CORRECTION**: Only return events that haven't passed
        }).sort({ eventDate: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// ** FIXED: Get COMPLETED events (public) **
app.get('/api/events/completed', async (req, res) => {
    try {
        const events = await Event.find({
            $or: [
                { status: 'completed' }, // Events manually marked as completed
                { eventDate: { $lt: new Date() } } // **LOGIC CORRECTION**: Or events whose date has passed
            ]
        }).sort({ eventDate: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Mark an event as complete (protected)
app.put('/api/events/:id/complete', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status: 'completed' },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json({ msg: 'Event marked as complete', event });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete an event (protected)
app.delete('/api/events/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json({ msg: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


// Link Masking Routes
app.post('/api/links/mask', auth, async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ msg: 'Original URL is required' });
    try {
        const shortCode = nanoid(7);
        let newLink = new Link({ originalUrl, shortCode });
        await newLink.save();
        const maskedUrl = `http://localhost:5000/r/${shortCode}`;
        res.status(201).json({ maskedUrl });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.get('/r/:shortCode', async (req, res) => {
    try {
        const link = await Link.findOne({ shortCode: req.params.shortCode });
        if (link) {
            return res.redirect(link.originalUrl);
        } else {
            return res.status(404).send('Link not found');
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));