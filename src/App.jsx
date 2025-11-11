import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import BrowseListings from './components/BrowseListings';
import ListingDetail from './components/ListingDetail';
import LandlordDashboard from './components/LandlordDashboard';
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
  const HomePage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-indigo-900' : 'bg-gradient-to-br from-indigo-50 to-white'}`}>
        <Navbar 
            user={user} 
            userType={userType} 
            handleSignOut={handleSignOut} 
            setCurrentView={setCurrentView} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
        />
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
            
            <Home className="text-indigo-600 mx-auto mb-6" size={64} />

            <h2 className={`text-6xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                CampusStay: Find Your Next Home
            </h2>
            <p className={`text-xl ${darkMode ? 'text-indigo-200' : 'text-gray-600'} mb-12 max-w-2xl mx-auto`}>
                The simple marketplace connecting students with landlords. Browse affordable rooms or list your property with ease.
            </p>
            
            <div className="flex justify-center gap-6">
                <button
                    onClick={() => setCurrentView('browse')}
                    className="bg-indigo-600 text-white px-10 py-3 rounded-full hover:bg-indigo-700 transition font-semibold text-lg shadow-xl hover:shadow-indigo-500/50 transform hover:scale-105"
                >
                    Browse Listings Now
                </button>
                <button
                    onClick={() => setCurrentView('auth')}
                    className={`${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'} px-10 py-3 rounded-full transition font-semibold text-lg shadow-md transform hover:scale-105`}
                >
                    Sign Up / List Property
                </button>
            </div>
        </div>
    </div>
  );


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