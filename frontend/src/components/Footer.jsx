import React from 'react';
import './Footer.css';	
const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
            <p className='footer-text'>© {new Date().getFullYear()} © 2024 Deepnetsoft Solutions. All rights reserved.</p>

            <div className='footer-links'>
                <p className='sub-footer-text'>Terms & Conditions</p>
                <p className='sub-footer-text'>Privacy Policy</p>
            </div>
            </div>
        </footer>
    );
};


export default Footer;