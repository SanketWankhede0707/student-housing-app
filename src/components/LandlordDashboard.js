import React, { useState } from 'react';
import { Home, PlusCircle, LogOut, MapPin, DollarSign, Bed, Users } from 'lucide-react';

const LandlordDashboard = ({ user, listings, setListings, handleSignOut, darkMode }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newListing, setNewListing] = useState({
      title: '',
      description: '',
      price: '',
      location: '',
      roomType: 'Studio',
      capacity: 1,
      amenityChecks: { WiFi: false, Furnished: false, AC: false, Laundry: false, Parking: false } 
    });

    const handleAmenityChange = (e) => {
        setNewListing({
            ...newListing,
            amenityChecks: {
                ...newListing.amenityChecks,
                [e.target.name]: e.target.checked
            }
        });
    };

    const handleAddListing = () => {
      if (!newListing.title || !newListing.price || !newListing.location) {
        alert("Please fill in Title, Price, and Location.");
        return;
      }
      
      const selectedAmenities = Object.keys(newListing.amenityChecks).filter(key => newListing.amenityChecks[key]);

      const listing = {
        id: listings.length + 1,
        title: newListing.title,
        description: newListing.description,
        price: Number(newListing.price),
        location: newListing.location,
        roomType: newListing.roomType,
        capacity: newListing.capacity,
        amenities: selectedAmenities,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', 
        landlordId: user?.id,
        available: true
      };
      
      setListings([...listings, listing]); 
      
      setShowAddForm(false);
      setNewListing({
        title: '', description: '', price: '', location: '', roomType: 'Studio', capacity: 1, 
        amenityChecks: { WiFi: false, Furnished: false, AC: false, Laundry: false, Parking: false }
      });
    };

    const myListings = listings.filter(l => l.landlordId === user?.id);
    const availableAmenities = ["WiFi", "Furnished", "AC", "Laundry", "Parking", "Private Bath"];


    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* --- Add New Listing Form --- */}
          {showAddForm && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 mb-8 border-t-4 border-indigo-600`}>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Listing</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Title */}
                <div className="md:col-span-2 lg:col-span-1">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                  <input type="text" value={newListing.title} onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`} required />
                </div>
                {/* Location */}
                <div className="lg:col-span-1">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                  <input type="text" value={newListing.location} onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`} required />
                </div>
                {/* Price */}
                <div className="lg:col-span-1">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price ($/mo)</label>
                  <input type="number" value={newListing.price} onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`} required />
                </div>
                {/* Room Type */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Room Type</label>
                  <select value={newListing.roomType} onChange={(e) => setNewListing({...newListing, roomType: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`} >
                    <option>Studio</option><option>Private</option><option>Shared</option>
                  </select>
                </div>
                 {/* Capacity */}
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Capacity</label>
                    <input type="number" min="1" value={newListing.capacity} onChange={(e) => setNewListing({...newListing, capacity: Number(e.target.value)})}
                        className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`} required />
                </div>

                {/* Description */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                  <textarea value={newListing.description} onChange={(e) => setNewListing({...newListing, description: e.target.value})} rows="3"
                    className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`} />
                </div>
                
                {/* Amenities Checkboxes */}
                <div className="md:col-span-2 lg:col-span-3">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amenities</label>
                    <div className="flex flex-wrap gap-4">
                        {availableAmenities.map(amenity => (
                            <div key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={amenity}
                                    checked={newListing.amenityChecks[amenity] || false}
                                    onChange={handleAmenityChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{amenity}</label>
                            </div>
                        ))}
                    </div>
                </div>

              </div>
              
              <div className="flex gap-4 mt-6 pt-4 border-t">
                <button
                  onClick={handleAddListing}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <PlusCircle size={20} />
                  Confirm Add Listing
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className={`px-6 py-2 rounded-lg transition ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {/* --- End Add New Listing Form --- */}

          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>My Listings ({myListings.length})</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <PlusCircle size={20} />
              {showAddForm ? 'Close Form' : 'List a New Property'}
            </button>
            {user?.id !== 'landlord1' && (
                <p className={`${darkMode ? 'text-yellow-300' : 'text-yellow-700'} text-sm`}>
                    Note: Only properties from the mock user 'landlord@test.com' (ID: landlord1) will be displayed here.
                </p>
            )}
          </div>
          

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.length > 0 ? myListings.map(listing => (
              <div key={listing.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
                <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{listing.title}</h3>
                  <div className={`flex items-center gap-2 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin size={16} />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} className="text-green-600" />
                      <span className="text-2xl font-bold text-green-600">${listing.price}</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={`flex-1 py-2 rounded text-sm transition ${darkMode ? 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>
                      Edit
                    </button>
                    <button className={`flex-1 py-2 rounded text-sm transition ${darkMode ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )) : (
                <div className={`col-span-full p-8 text-center rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    No listings found for your account. Click **List a New Property** to create one.
                </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default LandlordDashboard;