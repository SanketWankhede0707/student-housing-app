import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';

const BrowseListings = ({ 
    filteredListings, 
    searchTerm, setSearchTerm, 
    priceFilter, setPriceFilter, 
    roomTypeFilter, setRoomTypeFilter, 
    setCurrentView, setSelectedListing, 
    darkMode 
}) => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
            
            {/* --- Filters Section --- */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location/Property</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by location or property..."
                            className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Price: ${priceFilter}</label>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="50"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(Number(e.target.value))}
                            className="w-full accent-indigo-600 h-2 mt-3"
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Room Type</label>
                        <select
                            value={roomTypeFilter}
                            onChange={(e) => setRoomTypeFilter(e.target.value)}
                            className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="all">All Types</option>
                            <option value="Studio">Studio</option>
                            <option value="Private">Private</option>
                            <option value="Shared">Shared</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* --- End Filters Section --- */}

            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Found {filteredListings.length} Available Listings
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                    <div
                        key={listing.id}
                        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer`}
                        onClick={() => {
                            setSelectedListing(listing);
                            setCurrentView('listing-detail');
                        }}
                    >
                        <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-48 object-cover"
                        />
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
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${listing.roomType === 'Studio' ? 'bg-indigo-100 text-indigo-800' : listing.roomType === 'Private' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                    {listing.roomType}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default BrowseListings;