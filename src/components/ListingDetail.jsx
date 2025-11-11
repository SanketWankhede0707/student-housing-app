import React from 'react';
import { MapPin, DollarSign, Bed, Users } from 'lucide-react';

const ListingDetail = ({ selectedListing, setCurrentView }) => {
    const containerStyle = { minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' };
    const cardStyle = { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden' };
    const detailBoxStyle = { backgroundColor: '#f9fafb', padding: '15px', borderRadius: '6px' };
    
    if (!selectedListing) return <div>Loading...</div>;

    return (
        <div style={containerStyle}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <button
                    onClick={() => setCurrentView('browse')}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px', color: '#4f46e5', border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                    ← Back to Listings
                </button>
                
                <div style={cardStyle}>
                    <img
                        src={selectedListing.image}
                        alt={selectedListing.title}
                        style={{ width: '100%', height: '384px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '30px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>{selectedListing.title}</h1>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <DollarSign size={24} style={{ color: '#10b981' }} />
                                <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#10b981' }}>${selectedListing.price}</span>
                                <span style={{ fontSize: '16px', color: '#888' }}>/month</span>
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '18px' }}>
                                <MapPin size={20} />
                                {selectedListing.location}
                            </span>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Description</h2>
                            <p style={{ color: '#333' }}>{selectedListing.description}</p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Details</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={detailBoxStyle}>
                                    <span style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>Room Type</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedListing.roomType}</span>
                                </div>
                                <div style={detailBoxStyle}>
                                    <span style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>Capacity</span>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedListing.capacity} person(s)</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Amenities</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {selectedListing.amenities.map((amenity, idx) => (
                                    <span
                                        key={idx}
                                        style={{ padding: '6px 12px', borderRadius: '15px', fontSize: '14px', backgroundColor: '#e0e7ff', color: '#4f46e5' }}
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '18px', fontWeight: 'medium' }}>
                            Contact Landlord
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;