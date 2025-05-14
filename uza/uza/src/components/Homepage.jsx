import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Welcome to Uza Marketplace</h1>
        <p>Discover the latest gadgets and tech products tailored just for you</p>
        <button 
          className="cta-button"
          onClick={() => navigate('/products')}
        >
          Browse Products
        </button>
      </header>

      <section className="features-section">
        <div className="feature">
          <img src="https://img.icons8.com/color/96/artificial-intelligence.png" alt="AI Icon" />
          <h3>Personalized Recommendations</h3>
          <p>Get smart suggestions based on your browsing history</p>
        </div>
        <div className="feature">
          <img src="https://img.icons8.com/color/96/product.png" alt="Product Icon" />
          <h3>Wide Selection</h3>
          <p>Hundreds of tech products across all categories</p>
        </div>
        <div className="feature">
          <img src="https://img.icons8.com/color/96/lock-2.png" alt="Secure Icon" />
          <h3>Secure Shopping</h3>
          <p>Safe and reliable checkout process</p>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <img 
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b3?auto=format&fit=crop&w=400&q=60"
              alt="Customer Sarah"
              className="testimonial-image"
            />
            <p>"The recommendations were spot on! Found exactly what I needed."</p>
            <p className="author">- Sarah J.</p>
          </div>
          <div className="testimonial">
            <img 
              src="https://images.unsplash.com/photo-1590080876203-9e7c0a5b6f66?auto=format&fit=crop&w=400&q=60"
              alt="Customer Michael"
              className="testimonial-image"
            />
            <p>"Great selection of tech products with competitive prices."</p>
            <p className="author">- Michael T.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
