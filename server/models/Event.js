const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  supportEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: false,
  },
  eventTypes: {
    type: [String],
    required: true,
  },
  externalLink: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: { // This is the crucial new field
    type: String,
    enum: ['upcoming', 'completed'],
    default: 'upcoming',
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);