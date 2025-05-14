import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-section">
            <h4>Buy</h4>
            <ul>
              <li>Registration</li>
              <li>Money back guarantee</li>
              <li>Bidding & buying help</li>
              <li>Stores</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Sell</h4>
            <ul>
              <li>Start selling</li>
              <li>Learn to sell</li>
              <li>Business sellers</li>
              <li>Affiliates</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>About TechTrend</h4>
            <ul>
              <li>Company info</li>
              <li>News</li>
              <li>Investors</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Help & Contact</h4>
            <ul>
              <li>Seller Information Center</li>
              <li>Contact Us</li>
              <li>TechTrend Returns</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>Copyright © 2025 TechTrend Inc. All Rights Reserved.</p>
          <div className="legal-links">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;