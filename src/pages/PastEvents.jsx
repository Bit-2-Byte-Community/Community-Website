import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';

const PastEventCard = ({ event }) => {
  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = new Date(event.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <motion.div className="past-event-card" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
      <div className="flex flex-col md:flex-row items-stretch h-full">
        <div className="md:w-2/5 relative overflow-hidden">
          <img src={event.imageUrl} alt={event.eventName} className="w-full h-48 md:h-full object-cover absolute top-0 left-0" />
        </div>
        <div className="p-6 w-full flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {event.eventTypes.map(type => (<span key={type} className="text-xs font-semibold bg-dark-400/80 text-gray-400 px-3 py-1 rounded-full border border-gray-700">{type}</span>))}
          </div>
          <h2 className="text-2xl font-bold text-gray-300 mb-3 flex-grow">{event.eventName}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2"><Calendar size={16} /><span>{formattedDate}</span></div>
            <div className="flex items-center gap-2"><Clock size={16} /><span>{formattedTime}</span></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin size={16} /><span>{event.venue}</span></div>
        </div>
      </div>
    </motion.div>
  );
};

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events/completed');
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch past events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-32 pb-20 flex flex-col items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 text-white title-glow" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Past Events</motion.h1>
        <motion.div className="h-1 max-w-xs mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }} />
        <div className="mt-20 max-w-4xl mx-auto space-y-8">
          {loading ? (<div className="flex justify-center items-center gap-3 text-gray-400"><Loader2 className="animate-spin" /><span>Loading Past Events...</span></div>) : events.length > 0 ? (events.map(event => (<PastEventCard key={event._id} event={event} />))) : (<motion.div className="mt-16 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><Calendar className="w-16 h-16 text-gray-600 mb-4" /><h2 className="text-2xl font-semibold text-gray-400">No Past Events</h2><p className="text-gray-500 max-w-md mx-auto mt-2">The archive is empty for now.</p></motion.div>)}
        </div>
      </div>
    </motion.div>
  );
};

export default PastEvents;