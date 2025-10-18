import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, LogOut, Calendar, MapPin, Mail, Phone, Link2, X, CheckSquare, Square, ChevronsUpDown, Loader2, Trash2, CheckCircle, List, History } from 'lucide-react';
import axios from 'axios';

const eventTypeOptions = [
  "Entrepreneurship", "Technology", "Hackathon", "Mini Hackathon", 
  "Model Display", "Techfest", "Cybersecurity", "UI/UX"
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [formData, setFormData] = useState({
    eventName: '', eventDate: '', venue: '', supportEmail: '',
    contactPhone: '', eventTypes: [], originalLink: '',
    maskedLink: '', imageUrl: '',
  });
  const [imageName, setImageName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    return { headers: { 'x-auth-token': token } };
  }, []);

  const fetchEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    try {
      const res = await axios.get('http://localhost:5000/api/events', getAuthHeaders());
      setAllEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      if (error.response?.status === 401) navigate('/admin');
    } finally {
      setIsLoadingEvents(false);
    }
  }, [getAuthHeaders, navigate]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin');
    } else {
      fetchEvents();
    }
  }, [navigate, fetchEvents]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleEventTypeToggle = (option) => {
    setFormData(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(option)
        ? prev.eventTypes.filter(item => item !== option)
        : [...prev.eventTypes, option]
    }));
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageName(file.name);
    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('eventImage', file);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', uploadFormData, getAuthHeaders());
      setFormData({ ...formData, imageUrl: res.data.imageUrl });
    } catch (error) {
      alert('Image upload failed.');
      setImageName('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleMaskLink = async () => {
    if (!formData.originalLink) return alert('Please enter a link to mask.');
    try {
      const res = await axios.post('http://localhost:5000/api/links/mask', { originalUrl: formData.originalLink }, getAuthHeaders());
      setFormData({ ...formData, maskedLink: res.data.maskedUrl });
    } catch (error) {
      alert('Failed to mask the link.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert('Please upload an event banner.');
    try {
      await axios.post('http://localhost:5000/api/events', {
        ...formData,
        externalLink: formData.maskedLink || formData.originalLink,
      }, getAuthHeaders());
      alert('Event created!');
      setFormData({ eventName: '', eventDate: '', venue: '', supportEmail: '', contactPhone: '', eventTypes: [], originalLink: '', maskedLink: '', imageUrl: '' });
      setImageName('');
      fetchEvents();
    } catch (error) {
      alert('Failed to create event.');
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure? This is permanent.')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`, getAuthHeaders());
        alert('Event deleted.');
        fetchEvents();
      } catch (error) {
        alert('Could not delete the event.');
      }
    }
  };

  const handleComplete = async (eventId) => {
    if (window.confirm('Mark event as complete?')) {
      try {
        await axios.put(`http://localhost:5000/api/events/${eventId}/complete`, {}, getAuthHeaders());
        alert('Event marked as complete.');
        fetchEvents();
      } catch (error) {
        alert(`Could not update the event: ${error.response?.data?.msg || error.message}`);
      }
    }
  };

  // ** FIXED Filtering Logic **
  const upcomingEvents = allEvents.filter(event => event.status === 'upcoming');
  const completedEvents = allEvents.filter(event => event.status === 'completed');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-32 pb-20 overflow-hidden bg-dark-500">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center mb-12">
          <motion.h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>Admin Dashboard</motion.h1>
          <motion.button onClick={handleLogout} className="admin-logout-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><LogOut size={16} /> Logout</motion.button>
        </header>

        <motion.div className="p-8 rounded-2xl login-form-container mb-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}>
          <div className="flex items-center gap-4 mb-8"><UploadCloud className="w-8 h-8 text-primary-400" /><h2 className="text-3xl font-bold text-white">Upload New Event</h2></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label htmlFor="eventName" className="form-label">Event Name</label><input type="text" name="eventName" value={formData.eventName} onChange={handleChange} className="form-input" required /></div>
              <div>
                <label htmlFor="eventImage" className="form-label">Event Picture</label>
                <div className="file-input-wrapper">
                  <input type="file" name="eventImage" onChange={handleFileChange} disabled={isUploading} accept="image/png, image/jpeg, image/jpg" />
                  {isUploading ? (<div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-5 h-5 animate-spin" /><span>Uploading...</span></div>) : (<div className="flex items-center gap-2"><UploadCloud className="w-5 h-5" /><span className="truncate">{imageName || 'Click to upload a banner'}</span></div>)}
                </div>
                {formData.imageUrl && !isUploading && (<p className="text-xs text-green-400 mt-2 truncate">Successfully uploaded: {imageName}</p>)}
              </div>
              <div className="relative"><label htmlFor="eventDate" className="form-label">Date & Time</label><Calendar className="absolute left-3 top-11 w-5 h-5 text-gray-500 pointer-events-none" /><input type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} className="form-input pl-10" required /></div>
              <div className="relative"><label htmlFor="venue" className="form-label">Venue / Online Platform</label><MapPin className="absolute left-3 top-11 w-5 h-5 text-gray-500 pointer-events-none" /><input type="text" name="venue" value={formData.venue} onChange={handleChange} className="form-input pl-10" placeholder="e.g., Google Meet or GNIT Campus" required /></div>
              <div className="relative"><label htmlFor="supportEmail" className="form-label">Support Email</label><Mail className="absolute left-3 top-11 w-5 h-5 text-gray-500 pointer-events-none" /><input type="email" name="supportEmail" value={formData.supportEmail} onChange={handleChange} className="form-input pl-10" required /></div>
              <div className="relative"><label htmlFor="contactPhone" className="form-label">Contact No.</label><Phone className="absolute left-3 top-11 w-5 h-5 text-gray-500 pointer-events-none" /><input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="form-input pl-10" /></div>
              <div className="relative md:col-span-2">
                <label className="form-label">Event Type(s)</label>
                <div className="multi-select-container">
                  <div className="multi-select-display" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {formData.eventTypes.length > 0 ? (formData.eventTypes.map(type => (<span key={type} className="multi-select-pill">{type}<X size={12} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handleEventTypeToggle(type); }} /></span>))) : <span className="text-gray-500">Select event types...</span>}
                    <ChevronsUpDown className="w-5 h-5 text-gray-500 ml-auto" />
                  </div>
                  {isDropdownOpen && (<div className="multi-select-dropdown">{eventTypeOptions.map(option => (<div key={option} className="multi-select-option" onClick={() => handleEventTypeToggle(option)}>{formData.eventTypes.includes(option) ? <CheckSquare className="w-5 h-5 text-primary-400" /> : <Square className="w-5 h-5 text-gray-500" />}<span>{option}</span></div>))}</div>)}
                </div>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="originalLink" className="form-label">Registration Link</label>
                <div className="flex gap-2">
                  <input type="url" name="originalLink" value={formData.originalLink} onChange={handleChange} className="form-input" placeholder="https://forms.gle/..." required />
                  <motion.button type="button" onClick={handleMaskLink} className="px-4 py-2 bg-gray-600 rounded-lg text-sm hover:bg-gray-500" whileTap={{ scale: 0.95 }}>Mask</motion.button>
                </div>
                {formData.maskedLink && (<div className="mt-2 text-sm text-green-400 flex items-center gap-2"><Link2 size={14} /> Masked Link: <span className="font-mono">{formData.maskedLink}</span></div>)}
              </div>
            </div>
            <div className="pt-4 flex justify-end"><motion.button type="submit" className="admin-submit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isUploading}><UploadCloud size={18} /> Upload Event</motion.button></div>
          </form>
        </motion.div>

        <motion.div className="p-8 rounded-2xl login-form-container" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}>
          <div className="flex items-center gap-4 mb-8"><List className="w-8 h-8 text-primary-400" /><h2 className="text-3xl font-bold text-white">Manage Upcoming Events</h2></div>
          <div className="admin-event-list">
            {isLoadingEvents ? (<p>Loading events...</p>) : upcomingEvents.length > 0 ? (upcomingEvents.map(event => (<div key={event._id} className="admin-event-item"><img src={event.imageUrl} alt="" className="w-16 h-10 object-cover rounded-md" /><span className="font-semibold flex-grow truncate">{event.eventName}</span><div className="flex items-center gap-2"><button onClick={() => handleComplete(event._id)} className="admin-action-btn complete-btn"><CheckCircle size={16} /> Complete</button><button onClick={() => handleDelete(event._id)} className="admin-action-btn delete-btn"><Trash2 size={16} /> Delete</button></div></div>))) : (<p className="text-gray-500 text-center py-4">No upcoming events.</p>)}
          </div>
        </motion.div>
        
        <motion.div className="p-8 mt-12 rounded-2xl login-form-container" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}>
          <div className="flex items-center gap-4 mb-8"><History className="w-8 h-8 text-cyan-400" /><h2 className="text-3xl font-bold text-white">Completed Events</h2></div>
          <div className="admin-event-list">
            {isLoadingEvents ? (<p>Loading events...</p>) : completedEvents.length > 0 ? (completedEvents.map(event => (<div key={event._id} className="admin-event-item completed-item"><img src={event.imageUrl} alt="" className="w-16 h-10 object-cover rounded-md" /><span className="font-semibold flex-grow truncate">{event.eventName}</span><div className="flex items-center gap-2"><button onClick={() => handleDelete(event._id)} className="admin-action-btn delete-btn"><Trash2 size={16} /> Delete</button></div></div>))) : (<p className="text-gray-500 text-center py-4">No completed events yet.</p>)}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;