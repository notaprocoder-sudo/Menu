import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
        console.log('Navbar isOpen:', !isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/">
                    <img src="/images/Logo.png" alt="Logo" className="logo-image" />
                </NavLink>
                <div className="navbar-name-block">
                    <div>
                        <p className="name-blue logo-name">DEEP <span className="name-white">NET</span></p>
                    </div>
                    <p className="name-secondary logo-name">SOFT</p>
                </div>
            </div>
            <button className="navbar-toggle" onClick={toggleNavbar}>
                ☰
            </button>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                        HOME
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
                        MENU
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reserve" className={({ isActive }) => (isActive ? 'active' : '')}>
                        MAKE A RESERVATION
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                        CONTACT
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;