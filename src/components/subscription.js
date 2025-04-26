import React, { useState } from 'react';
import qr from "../components/Logo/qr.jpeg"; // QR image import
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import subs from "./Logo/subs.mp4"; // Import background video

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planChoice, setPlanChoice] = useState('');

  const plans = [
    {
      name: "Basic",
      price: "$8.99/month",
      features: [
        "1 Screen",
        "HD available",
        "Watch on Mobile"
      ],
      devices: "1 Device",
      resolution: "HD"
    },
    {
      name: "Standard",
      price: "$13.99/month",
      features: [
        "2 Screens",
        "HD and Ultra HD available",
        "Watch on TV, Laptop, and Mobile"
      ],
      devices: "2 Devices",
      resolution: "HD, Ultra HD"
    },
    {
      name: "Premium",
      price: "$17.99/month",
      features: [
        "4 Screens",
        "HD, Ultra HD, and 4K available",
        "Watch on TV, Laptop, Mobile, and Tablet"
      ],
      devices: "4 Devices",
      resolution: "HD, Ultra HD, 4K"
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    toast.success(`You selected the ${plan.name} plan!`); // Show success toast on plan selection
  };

  const handleSubscribe = () => {
    if (selectedPlan || planChoice) {
      toast.success(`Subscribed to ${planChoice || selectedPlan.name} Plan for ${selectedPlan ? selectedPlan.price : 'your selected price'}`); // Success message
    } else {
      toast.error('Please select a plan to subscribe'); // Error message if no plan selected
    }
  };

  return (
    <div style={styles.subscriptionContainer}>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        style={styles.backgroundVideo}
      >
        <source src={subs} type="video/mp4" />
      </video>

      <h2 style={styles.title}>Choose Your Plan</h2>

      <div style={styles.plans}>
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              ...styles.planCard,
              ...(selectedPlan === plan ? styles.selectedPlan : {})
            }}
            onClick={() => handleSelectPlan(plan)}
          >
            <div style={styles.planDetails}>
              <p style={styles.planInfo}>{plan.devices} • {plan.resolution}</p>
            </div>

            <h3>{plan.name}</h3>
            <p style={styles.price}>{plan.price}</p>
            <ul style={styles.features}>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* QR Code - Replaced with imported qr image */}
      <div style={styles.qrContainer}>
        <img src={qr} alt="QR Code" style={styles.qrCode} />
        <p style={styles.qrText}>Scan the QR Code to Subscribe</p>
      </div>

      {/* Dropdown for Plan Selection */}
      <div style={styles.planDropdownContainer}>
        <select
          value={planChoice}
          onChange={(e) => setPlanChoice(e.target.value)}
          style={styles.planDropdown}
        >
          <option value="">Select a Plan</option>
          {plans.map((plan, index) => (
            <option key={index} value={plan.name}>
              {plan.name} - {plan.price}
            </option>
          ))}
        </select>
      </div>

      {/* Subscribe Button */}
      <button
        style={styles.subscribeButton}
        onClick={handleSubscribe}
      >
        Subscribe Now
      </button>

      {/* Toaster for displaying toast notifications */}
      <Toaster />
    </div>
  );
};

// Inline CSS styles with enhanced visibility, bold text, and smooth animations
const styles = {
  subscriptionContainer: {
    position: 'relative',
    padding: '40px 20px',
    textAlign: 'center',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    boxSizing: 'border-box',
    animation: 'fadeIn 1.5s ease-out',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, // Place the video behind all other content
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#fff',
    textShadow: '2px 2px 6px rgba(0,0,0,0.5)', // Darker text shadow for contrast
  },
  plans: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px', // More space between plan cards for clarity
    flexWrap: 'wrap',
    marginTop: '30px',
    padding: '0',
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Semi-transparent white background
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)', // Darker shadows for the card
    width: '280px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    textAlign: 'center',
    marginBottom: '30px',
    opacity: '0.9',
    fontWeight: 'bold',
    animation: 'fadeIn 1.5s ease-out',
  },
  selectedPlan: {
    backgroundColor: '#e50914',  // Red background for selected plan (like Disney+ red)
    color: 'white',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',  // Darker shadow for better contrast
    transform: 'scale(1.05)',
    border: '3px solid #f40612',  // Orange border when selected
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
  },
  planDetails: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '18px',
    color: '#ccc',
    fontSize: '1.1rem',
  },
  planInfo: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
  },
  features: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '25px',
    fontSize: '1.1rem',
    color: '#fff',
  },
  qrContainer: {
    marginTop: '40px',
    textAlign: 'center',
    marginBottom: '40px',
    animation: 'fadeIn 1.5s ease-out',
  },
  qrCode: {
    width: '180px',
    height: '180px',
    marginBottom: '15px',
    borderRadius: '12px',
    animation: 'zoomIn 0.5s ease-out', // Smooth zoom-in effect
  },
  qrText: {
    fontSize: '1.2rem',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  planDropdownContainer: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  planDropdown: {
    fontSize: '1.1rem',
    padding: '12px',
    width: '220px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#333',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  },
  subscribeButton: {
    backgroundColor: '#e50914',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    marginTop: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    fontWeight: 'bold',
  },
};

export default Subscription;
