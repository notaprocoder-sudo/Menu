import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import Menu from './pages/Menu';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reserve" element={<h1>Reservation Page</h1>} />
                <Route path="/contact" element={<h1>Contact Page</h1>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;