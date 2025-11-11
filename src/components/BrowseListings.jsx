import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';

const BrowseListings = ({ 
    filteredListings, 
    searchTerm, setSearchTerm, 
    priceFilter, setPriceFilter, 
    roomTypeFilter, setRoomTypeFilter, 
    setCurrentView, setSelectedListing, 
}) => {
    const containerStyle = { minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' };
    const filtersBoxStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' };
    const inputStyle = { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };
    const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' };

    return (
        <div style={containerStyle}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* --- Filters Section --- */}
                <div style={filtersBoxStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Location/Property</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by location or property..."
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Max Price: ${priceFilter}</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(Number(e.target.value))}
                                style={{ width: '100%', marginTop: '5px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Room Type</label>
                            <select
                                value={roomTypeFilter}
                                onChange={(e) => setRoomTypeFilter(e.target.value)}
                                style={inputStyle}
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

                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Found {filteredListings.length} Available Listings
                </h2>
                
                <div style={gridStyle}>
                    {filteredListings.map(listing => (
                        <div
                            key={listing.id}
                            style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer', border: '1px solid #eee' }}
                            onClick={() => {
                                setSelectedListing(listing);
                                setCurrentView('listing-detail');
                            }}
                        >
                            <img
                                src={listing.image}
                                alt={listing.title}
                                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '15px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{listing.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', marginBottom: '8px', fontSize: '14px' }}>
                                    <MapPin size={16} />
                                    <span>{listing.location}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <DollarSign size={20} style={{ color: '#10b981' }} />
                                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>${listing.price}</span>
                                        <span style={{ fontSize: '14px', color: '#888' }}>/month</span>
                                    </div>
                                    <span style={{ padding: '4px 10px', fontSize: '12px', fontWeight: 'medium', borderRadius: '15px', backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                                        {listing.roomType}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                                    {listing.amenities.map((amenity, idx) => (
                                        <span key={idx} style={{ fontSize: '12px', padding: '3px 8px', backgroundColor: '#f0f9ff', color: '#3b82f6', borderRadius: '4px' }}>
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrowseListings;