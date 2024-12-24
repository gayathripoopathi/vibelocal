import React, { useState } from 'react';  // Import useState hook for managing modal visibility
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

function Header() {
  // State to manage the visibility of the sign-up modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        {/* Logo */}
        <div className="nav__logo-container">
          <a href="/" className="nav__logo">Vibe Local</a>  {/* Set href to '/' for homepage */}
        </div>

        {/* Navigation Menu */}
        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item"><Link to="/home" className="nav__link active">Home</Link></li>
            <li className="nav__item"><Link to="/about" className="nav__link">About</Link></li>
            <li className="nav__item"><Link to="/contact" className="nav__link">Contact</Link></li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="nav__btns">
          <button onClick={toggleModal} className="nav__btn">Sign Up</button> {/* Open modal on click */}
          <a href="#log-in" className="nav__btn">Log In</a>
          <a href="#settings" className="settings__icon"><i className="bx bx-cog"></i></a> {/* Settings Icon */}
        </div>
      </nav>

      {/* Modal for Seller/Buyer selection */}
      {isModalOpen && (
        <div className="signup-modal">
          <div className="signup-modal-content">
            <h2>Sign Up as:</h2>
            <button onClick={() => alert('Signed up as Seller')} className="modal-btn">Seller</button>
            <button onClick={() => alert('Signed up as Buyer')} className="modal-btn">Buyer</button>
            <button onClick={toggleModal} className="modal-close-btn">Close</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
