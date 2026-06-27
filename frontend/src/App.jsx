import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Overview from './pages/Overview';
import TourDetail from './pages/TourDetail';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';

import toursFallback from './data/toursFallback.json';

const App = () => {
  const [tours, setTours] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  
  // Set default logged in user for showcase
  const [user, setUser] = useState({
    name: 'Jonas Schmedtmann',
    email: 'admin@natours.io',
    photo: 'user-1.jpg',
    role: 'admin',
  });

  // Pre-populate with one active booking so Bookings view is not blank on first visit
  const [bookings, setBookings] = useState([
    {
      tourId: '5c88fa8cf4afda39709c295a',
      tourName: 'The Park Camper',
      imageCover: 'tour-5-cover.jpg',
      price: 1497,
      date: '2026-08-15T00:00:00.000Z',
      participants: 2,
      totalPrice: 2994,
    }
  ]);

  // Load tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Try fetching from Express API backend
        const res = await fetch('/api/v1/tours');
        if (!res.ok) throw new Error('API fetch failed');
        const data = await res.json();
        
        if (data && data.data && data.data.data) {
          setTours(data.data.data);
        } else if (data && data.data && data.data.tours) {
          setTours(data.data.tours);
        } else {
          // If response is standard array
          setTours(Array.isArray(data) ? data : toursFallback);
        }
        console.log('Successfully fetched tours from Express API.');
      } catch (err) {
        console.warn('API connection failed. Falling back to local dataset.', err);
        // Fallback to static copy
        setTours(toursFallback);
      }
    };

    fetchTours();
  }, []);

  // Authentication actions
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Booking actions
  const handleBookTour = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    alert(`Success! You have booked ${newBooking.tourName} for ${newBooking.participants} people.`);
  };

  const handleCancelBooking = (indexToCancel) => {
    setBookings((prev) => prev.filter((_, idx) => idx !== indexToCancel));
    alert('Booking cancelled successfully.');
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Glass Header */}
        <Header
          user={user}
          onLogout={handleLogout}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />

        {/* Content Router area */}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Overview tours={tours} searchVal={searchVal} />} />
            <Route path="/tour/:id" element={<TourDetail tours={tours} onBookTour={handleBookTour} />} />
            
            {/* Booking routes */}
            <Route
              path="/bookings"
              element={user ? <Bookings bookings={bookings} onCancelBooking={handleCancelBooking} /> : <Navigate to="/login" />}
            />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/about" element={<AboutUs />} />
            
            {/* Wildcard redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Modern Brand Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
