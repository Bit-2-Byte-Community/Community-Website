import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Calendar, MapPin, Mail, Phone, Link as LinkIcon, ChevronDown, Clock, Loader2 } from 'lucide-react';
import Countdown from '../components/ui/Countdown'; // IMPORT THE NEW COMPONENT

const EventCard = ({ event, isSelected, setSelectedId, onRefresh }) => {
  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = new Date(event.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <motion.div layoutId={`card-container-${event._id}`} onClick={() => setSelectedId(isSelected ? null : event._id)} className="event-card">
      <motion.div className="flex flex-col md:flex-row items-stretch">
        <motion.div className="md:w-2/5 relative overflow-hidden">
          <motion.img layoutId={`card-image-${event._id}`} src={event.imageUrl} alt={event.eventName} className="w-full h-48 md:h-full object-cover absolute top-0 left-0" />
        </motion.div>
        <motion.div className="p-6 w-full flex flex-col">
          <motion.div className="flex flex-wrap gap-2 mb-3">
            {event.eventTypes.map(type => (<span key={type} className="text-xs font-semibold bg-dark-400/80 text-primary-300 px-3 py-1 rounded-full border border-primary-500/30">{type}</span>))}
          </motion.div>
          <motion.h2 layoutId={`card-title-${event._id}`} className="text-2xl font-bold text-white mb-3 flex-grow">{event.eventName}</motion.h2>
          <motion.div layoutId={`card-date-${event._id}`} className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2"><Calendar size={16} className="text-primary-400" /><span>{formattedDate}</span></div>
            <div className="flex items-center gap-2"><Clock size={16} className="text-primary-400" /><span>{formattedTime}</span></div>
          </motion.div>

          {/* ADD THE COUNTDOWN COMPONENT HERE */}
          <Countdown targetDate={event.eventDate} onComplete={onRefresh} />
          
          <motion.button layout className="event-register-btn mt-6 self-start">
            {isSelected ? 'Hide Details' : 'Show Details'}
            <motion.div animate={{ rotate: isSelected ? 180 : 0 }}><ChevronDown size={18} /></motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isSelected && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-gray-700/50 mt-4 pt-6">
              <h3 className="font-bold text-lg text-white mb-4">Event Details</h3>
              <div className="event-card-details-grid">
                <div className="event-card-detail-item col-span-1 md:col-span-2"><MapPin size={16} className="text-primary-400 shrink-0 mt-1" /><span>{event.venue}</span></div>
                <div className="event-card-detail-item"><Mail size={16} className="text-primary-400 shrink-0 mt-1" /><span>{event.supportEmail}</span></div>
                {event.contactPhone && <div className="event-card-detail-item"><Phone size={16} className="text-primary-400 shrink-0 mt-1" /><span>{event.contactPhone}</span></div>}
              </div>
              <motion.a href={event.externalLink} target="_blank" rel="noopener noreferrer" className="external-link-btn"><LinkIcon size={18} /> Register Now</motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/events/upcoming');
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch upcoming events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  const title = "Upcoming Events";
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const letterVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } } };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-32 pb-20 flex flex-col items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 variants={containerVariants} initial="hidden" animate="visible" className="text-5xl md:text-7xl font-bold mb-6 text-white flex justify-center flex-wrap">
          {title.split("").map((char, index) => (<motion.span key={index} variants={letterVariants} className={`inline-block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent ${char === ' ' ? 'mx-2' : ''}`}>{char}</motion.span>))}
        </motion.h1>
        <motion.div className="h-1 max-w-xs mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
        <div className="mt-20 max-w-4xl mx-auto space-y-8">
          {loading ? (<div className="flex justify-center items-center gap-3 text-gray-400"><Loader2 className="animate-spin" /><span>Loading Events...</span></div>) : events.length > 0 ? (events.map(event => (<EventCard key={event._id} event={event} isSelected={selectedId === event._id} setSelectedId={setSelectedId} onRefresh={fetchEvents} />))) : (<motion.div className="mt-16 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><Calendar className="w-16 h-16 text-gray-600 mb-4" /><h2 className="text-2xl font-semibold text-gray-400">Stay Tuned</h2><p className="text-gray-500 max-w-md mx-auto mt-2">No upcoming events right now.</p></motion.div>)}
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingEvents;