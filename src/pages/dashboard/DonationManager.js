import React, { useState } from 'react';
import Header from './Header';

const DonationManager = () => {
  const [formData, setFormData] = useState({
    foodItem: '',
    quantity: 10,
    city: '',
    area: '',
    bestBeforeTime: '',
    contactPhone: '',
    servingSize: 1,
    storageInstructions: '',
    dietaryInfo: '',
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });

  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities = [
    'New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore',
    'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCitySelect = (city) => {
    setFormData({ ...formData, city });
    setShowCityDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({ message: 'Donation posted successfully!', type: 'success' });
        setFormData({
          foodItem: '',
          quantity: 10,
          city: '',
          area: '',
          bestBeforeTime: '',
          contactPhone: '',
          servingSize: 1,
          storageInstructions: '',
          dietaryInfo: '',
        });
      } else {
        setNotification({ message: 'Failed to post donation. Please try again.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
    }
  };

  return (
    <div className="donation-manager">
      <Header />
      <div className="donation-form-page">
        <h1 className="donation-form-title">Post Food Donation</h1>

        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.type === 'success' ? (
              <i className="notification-icon">✓</i>
            ) : (
              <i className="notification-icon">✕</i>
            )}
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="donation-form">
          <div>
            <label>Food Item</label>
            <input
              type="text"
              name="foodItem"
              value={formData.foodItem}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Quantity (servings)</label>
            <input
              type="range"
              name="quantity"
              min="1"
              max="100"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            <span>{formData.quantity}</span>
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              onFocus={() => setShowCityDropdown(true)}
              required
            />
            {showCityDropdown && (
              <ul>
                {cities.map((city, index) => (
                  <li key={index} onClick={() => handleCitySelect(city)}>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label>Pickup Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Best Before Time</label>
            <input
              type="datetime-local"
              name="bestBeforeTime"
              value={formData.bestBeforeTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Serving Size</label>
            <input
              type="range"
              name="servingSize"
              min="1"
              max="10"
              value={formData.servingSize}
              onChange={handleInputChange}
            />
            <span>{formData.servingSize}</span>
          </div>

          <div>
            <label>Storage Instructions</label>
            <textarea
              name="storageInstructions"
              value={formData.storageInstructions}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <label>Dietary Information</label>
            <textarea
              name="dietaryInfo"
              value={formData.dietaryInfo}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button type="submit">Post Donation</button>
        </form>
      </div>
    </div>
  );
};

export default DonationManager;