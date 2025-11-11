import React, { useState, useEffect } from 'react';
// UPDATE THESE LINES:
import Navbar from './components/Navbar.jsx'; 
import AuthPage from './components/AuthPage.jsx'; 
import BrowseListings from './components/BrowseListings.jsx'; 
import ListingDetail from './components/ListingDetail.jsx'; 
import LandlordDashboard from './components/LandlordDashboard.jsx'; 

import { Home } from 'lucide-react';
import './App.css'; // Keep this to load any custom Vite/React styles

// --- MOCK DATA ---
const mockListings = [
  {
    id: 1,
    title: "Cozy Studio Near Campus",
    description: "Perfect for students! Walking distance to university, fully furnished with WiFi included.",
    price: 450,
    location: "Downtown Campus Area",
    roomType: "Studio",
    capacity: 1,
    amenities: ["WiFi", "Furnished", "AC"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    landlordId: "landlord1", 
    available: true
  },
  {
    id: 2,
    title: "Shared Apartment - 2 Beds Available",
    description: "Great roommate setup with shared kitchen and living area. Friendly community.",
    price: 350,
    location: "North Student District",
    roomType: "Shared",
    capacity: 2,
    amenities: ["WiFi", "Kitchen", "Laundry"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    landlordId: "landlord2",
    available: true
  },
  {
    id: 3,
    title: "Private Room in Modern House",
    description: "Quiet neighborhood, private bathroom, parking available. 10 min bus to campus.",
    price: 550,
    location: "Westside Residential",
    roomType: "Private",
    capacity: 1,
    amenities: ["WiFi", "Parking", "Private Bath", "Furnished"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    landlordId: "landlord1", 
    available: true
  },
];

const mockUsers = {
    "student@test.com": { id: 'student1', email: 'student@test.com', type: 'student' },
    "landlord@test.com": { id: 'landlord1', email: 'landlord@test.com', type: 'landlord' },
};
// --- END MOCK DATA ---

function App() {
  // State for application control
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null); 
  const [userType, setUserType] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // State for listings and filtering
  const [listings, setListings] = useState(mockListings);
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState(1000);
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');

  // --- Auth Functions (MOCK) ---
  const handleSignUp = (email, password, type) => {
    if (mockUsers[email]) {
        alert('User already exists! Please sign in.');
        return;
    }
    const newId = type === 'landlord' ? `landlord${Math.floor(Math.random() * 100) + 3}` : `student${Math.floor(Math.random() * 100) + 2}`;
    const newUser = { id: newId, email, type };
    mockUsers[email] = newUser;
    setUser(newUser);
    setUserType(type);
    setCurrentView(type === 'student' ? 'browse' : 'landlord-dashboard');
  };

  const handleSignIn = (email, password) => {
    const foundUser = mockUsers[email];
    if (foundUser) {
        setUser(foundUser);
        setUserType(foundUser.type);
        setCurrentView(foundUser.type === 'student' ? 'browse' : 'landlord-dashboard');
    } else {
        alert('Invalid email or user not found. Try student@test.com or landlord@test.com');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setUserType(null);
    setCurrentView('home');
  };

  // --- Filtering Logic ---
  useEffect(() => {
    let filtered = listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = listing.price <= priceFilter;
      const matchesType = roomTypeFilter === 'all' || listing.roomType === roomTypeFilter;
      return matchesSearch && matchesPrice && matchesType;
    });
    setFilteredListings(filtered);
  }, [searchTerm, priceFilter, roomTypeFilter, listings]);

// --- Home Page Component ---
const HomePage = () => {
    // Determine if the screen is small (less than 640px)
    const isMobile = window.innerWidth < 640;

    const mainContainerStyle = { 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb',
        padding: isMobile ? '0 15px' : '0 20px',
        fontFamily: 'sans-serif'
    };
    
    const contentBoxStyle = { 
        maxWidth: '900px', 
        margin: '0 auto', 
        paddingTop: isMobile ? '80px' : '150px', 
        textAlign: 'center' 
    };

    const headingStyle = { 
        fontSize: isMobile ? '36px' : '48px', // Smaller heading on mobile
        fontWeight: '800', 
        marginBottom: '10px', 
        color: '#1f2937' 
    };

    const textStyle = { 
        fontSize: isMobile ? '16px' : '18px', // Smaller text on mobile
        color: '#6b7280', 
        marginBottom: '40px', 
        maxWidth: '600px', 
        margin: '0 auto 40px'
    };

    const buttonContainerStyle = { 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', // Stack buttons on mobile
        justifyContent: 'center', 
        gap: '15px' 
    };

    return (
        <div style={mainContainerStyle}>
            <Navbar 
                user={user} 
                userType={userType} 
                handleSignOut={handleSignOut} 
                setCurrentView={setCurrentView} 
            />
            <div style={contentBoxStyle}>
                
                <Home style={{ color: '#4f46e5', margin: '0 auto', marginBottom: '20px' }} size={isMobile ? 48 : 64} />

                <h2 style={headingStyle}>
                    CampusStay: Find Your Next Home
                </h2>
                <p style={textStyle}>
                    The simple marketplace connecting students with landlords. Browse affordable rooms or list your property with ease.
                </p>
                
                <div style={buttonContainerStyle}>
                    <button
                        onClick={() => setCurrentView('browse')}
                        style={{
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            padding: '12px 20px',
                            borderRadius: '25px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#4338ca'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#4f46e5'}
                    >
                        Browse Listings Now
                    </button>
                    <button
                        onClick={() => setCurrentView('auth')}
                        style={{
                            backgroundColor: 'white',
                            color: '#4f46e5',
                            border: '2px solid #4f46e5',
                            padding: '12px 20px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#eef2ff'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                    >
                        Sign Up / List Property
                    </button>
                </div>
            </div>
        </div>
    );
};

  // --- Main Rendering Logic ---
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'auth':
        return <AuthPage handleSignUp={handleSignUp} handleSignIn={handleSignIn} setCurrentView={setCurrentView} darkMode={darkMode} />;
      case 'browse':
        return (
            <>
                <Navbar 
                    view="browse" user={user} userType={userType} 
                    handleSignOut={handleSignOut} setCurrentView={setCurrentView} 
                    darkMode={darkMode} setDarkMode={setDarkMode} 
                />
                <BrowseListings 
                    filteredListings={filteredListings} 
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
                    priceFilter={priceFilter} setPriceFilter={setPriceFilter} 
                    roomTypeFilter={roomTypeFilter} setRoomTypeFilter={setRoomTypeFilter} 
                    setCurrentView={setCurrentView} setSelectedListing={setSelectedListing} 
                    darkMode={darkMode}
                />
            </>
        );
      case 'listing-detail':
        return (
            <>
                <Navbar 
                    view="detail" user={user} userType={userType} 
                    handleSignOut={handleSignOut} setCurrentView={setCurrentView} 
                    darkMode={darkMode} setDarkMode={setDarkMode} 
                />
                <ListingDetail 
                    selectedListing={selectedListing} 
                    setCurrentView={setCurrentView} 
                    darkMode={darkMode} 
                />
            </>
        );
      case 'landlord-dashboard':
        return (
            <>
                <Navbar 
                    view="landlord-dashboard" user={user} userType={userType} 
                    handleSignOut={handleSignOut} setCurrentView={setCurrentView} 
                    darkMode={darkMode} setDarkMode={setDarkMode} 
                />
                <LandlordDashboard 
                    user={user} 
                    listings={listings} 
                    setListings={setListings} 
                    handleSignOut={handleSignOut}
                    darkMode={darkMode}
                />
            </>
        );
      default:
        return <HomePage />;
    }
  };

  return renderView();
}

export default App;