import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Faculty from './pages/Faculty';
import Advisors from './pages/Advisors';
import Team2024 from './pages/Team2024';
import Community from './pages/Community';
import Maintainers from './pages/Maintainers';
import UpcomingEvents from './pages/UpcomingEvents';
import PastEvents from './pages/PastEvents';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Archives from './pages/Archives'; // ADD THIS IMPORT
import Projects from './pages/Projects';
import ProjectsSIH from './pages/ProjectsSIH';
// import Companies from './components/Companies';

const AppContent = () => {
  const location = useLocation();
  // Using useCallback for optimization
  const particlesInit = useCallback(async engine => { await loadSlim(engine); }, []);
  
  const particleOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        resize: true
      },
      modes: {
        grab: {
          distance: 150,
          links: { opacity: 0.8, color: '#8c8c8c' }
        }
      }
    },
    particles: {
      color: { value: '#ffffff' },
      links: {
        color: '#ffffff',
        distance: 160,
        enable: true,
        opacity: 0.15,
        width: 1
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'out' },
        random: true, 
        speed: 1,
        straight: false
      },
      number: {
        density: { enable: true, area: 800 },
        value: 130
      },
      opacity: {
        value: {min: 0.05, max: 0.4}
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 0.5, max: 2 }
      }
    },
    detectRetina: true
  };
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen relative"> 
      {!isAdminRoute && <Particles id="tsparticles" init={particlesInit} options={particleOptions} className="fixed inset-0 -z-10" />}
      {!isAdminRoute && <Header />}
      {/* UPDATED: Added className="relative" to <main> to satisfy Framer Motion's requirement for a non-static container, fixing the warning. */}
      <main className="relative"> 
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/advisors" element={<Advisors />} />
            <Route path="/gen-1" element={<Team2024 />} /> 
            <Route path="/community" element={<Community />} />
            <Route path="/projects" element={<Projects />} />
            <Route path='/sih-projects' element={<ProjectsSIH />} />
            <Route path="/maintainers" element={<Maintainers />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/past-events" element={<PastEvents />} />
            <Route path="/archives" element={<Archives />} /> {/* ADD THIS ROUTE */}
            
            {/* <Route path="/companies" element={<Companies />} /> */}

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;