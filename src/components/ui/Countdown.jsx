import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const CountdownSegment = ({ value, label }) => (
    <div className="countdown-segment">
        <span className="countdown-digit">{String(value).padStart(2, '0')}</span>
        <span className="countdown-label">{label}</span>
    </div>
);

const Countdown = ({ targetDate, onComplete }) => {
    const calculateTimeLeft = useCallback(() => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (Object.keys(newTimeLeft).length === 0) {
                clearInterval(timer);
                // Wait a moment before triggering refresh to allow backend to update
                setTimeout(onComplete, 1500); 
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete, calculateTimeLeft]);

    const hasTime = Object.keys(timeLeft).length > 0;

    return (
        <motion.div 
            className="countdown-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            {hasTime ? (
                <>
                    <CountdownSegment value={timeLeft.days} label="Days" />
                    <CountdownSegment value={timeLeft.hours} label="Hours" />
                    <CountdownSegment value={timeLeft.minutes} label="Mins" />
                    <CountdownSegment value={timeLeft.seconds} label="Secs" />
                </>
            ) : (
                <div className="text-cyan-400 font-semibold">Event has Finished!</div>
            )}
        </motion.div>
    );
};

export default Countdown;