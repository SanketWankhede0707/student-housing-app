import React from 'react';
import { MapPin, DollarSign, Bed, Users } from 'lucide-react';

const ListingDetail = ({ selectedListing, setCurrentView, darkMode }) => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => setCurrentView('browse')}
                className={`flex items-center gap-1 mb-4 ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} transition text-sm`}
            >
                ← Back to Listings
            </button>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
                <img
                    src={selectedListing.image}
                    alt={selectedListing.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-8">
                    <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedListing.title}</h1>
                    
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <div className="flex items-center gap-2">
                            <DollarSign size={24} className="text-green-600" />
                            <span className="text-3xl font-bold text-green-600">${selectedListing.price}</span>
                            <span className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                        </div>
                        <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                            <MapPin size={20} />
                            {selectedListing.location}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Description</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedListing.description}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Details & Amenities</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-lg flex items-center gap-2`}>
                                <Bed size={20} className="text-indigo-500" />
                                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Room Type: <strong>{selectedListing.roomType}</strong></span>
                            </div>
                            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-lg flex items-center gap-2`}>
                                <Users size={20} className="text-indigo-500" />
                                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Capacity: <strong>{selectedListing.capacity}</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2">
                            {selectedListing.amenities.map((amenity, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}
                              >
                                {amenity}
                              </span>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium text-lg">
                        Contact Landlord
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ListingDetail;