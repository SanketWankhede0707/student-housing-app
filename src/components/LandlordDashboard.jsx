import React, { useState } from 'react';
import { PlusCircle, MapPin, DollarSign } from 'lucide-react';

const LandlordDashboard = ({ user, listings, setListings }) => {
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

    const containerStyle = { minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' };
    const boxStyle = { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '25px', marginBottom: '30px' };
    const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
    const buttonPrimaryStyle = { padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' };
    const buttonSecondaryStyle = { padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#333', border: 'none', borderRadius: '6px', cursor: 'pointer' };
    const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' };

    return (
        <div style={containerStyle}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* --- Add New Listing Form --- */}
                {showAddForm && (
                    <div style={boxStyle}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add New Listing</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                            
                            <div style={{ gridColumn: 'span 1' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
                                <input type="text" value={newListing.title} onChange={(e) => setNewListing({...newListing, title: e.target.value})} style={inputStyle} required />
                            </div>
                            <div style={{ gridColumn: 'span 1' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Location</label>
                                <input type="text" value={newListing.location} onChange={(e) => setNewListing({...newListing, location: e.target.value})} style={inputStyle} required />
                            </div>
                            <div style={{ gridColumn: 'span 1' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Price ($/mo)</label>
                                <input type="number" value={newListing.price} onChange={(e) => setNewListing({...newListing, price: e.target.value})} style={inputStyle} required />
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Room Type</label>
                                <select value={newListing.roomType} onChange={(e) => setNewListing({...newListing, roomType: e.target.value})} style={inputStyle}>
                                    <option>Studio</option><option>Private</option><option>Shared</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Capacity</label>
                                <input type="number" min="1" value={newListing.capacity} onChange={(e) => setNewListing({...newListing, capacity: Number(e.target.value)})} style={inputStyle} required />
                            </div>

                            <div style={{ gridColumn: 'span 3' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                                <textarea value={newListing.description} onChange={(e) => setNewListing({...newListing, description: e.target.value})} rows="3" style={{...inputStyle, height: '80px'}} />
                            </div>
                            
                            <div style={{ gridColumn: 'span 3' }}>
                                <label style={{ display: 'block', marginBottom: '10px' }}>Amenities</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                    {availableAmenities.map(amenity => (
                                        <div key={amenity} style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                name={amenity}
                                                checked={newListing.amenityChecks[amenity] || false}
                                                onChange={handleAmenityChange}
                                                style={{ marginRight: '5px' }}
                                            />
                                            <label style={{ fontSize: '14px' }}>{amenity}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                            <button onClick={handleAddListing} style={buttonPrimaryStyle}>
                                <PlusCircle size={20} />
                                Confirm Add Listing
                            </button>
                            <button onClick={() => setShowAddForm(false)} style={buttonSecondaryStyle}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {/* --- End Add New Listing Form --- */}

                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>My Listings ({myListings.length})</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <button onClick={() => setShowAddForm(!showAddForm)} style={buttonPrimaryStyle}>
                        <PlusCircle size={20} />
                        {showAddForm ? 'Close Form' : 'List a New Property'}
                    </button>
                    {user?.id !== 'landlord1' && (
                        <p style={{ fontSize: '14px', color: '#b91c1c' }}>
                            Note: Only properties from 'landlord@test.com' (ID: landlord1) will be displayed here.
                        </p>
                    )}
                </div>
                

                <div style={gridStyle}>
                    {myListings.length > 0 ? myListings.map(listing => (
                        <div key={listing.id} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #eee' }}>
                            <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '192px', objectFit: 'cover'}}/>
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
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button style={{ flex: '1', padding: '8px', backgroundColor: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                                        Edit
                                    </button>
                                    <button style={{ flex: '1', padding: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ gridColumn: 'span 3', padding: '30px', textAlign: 'center', backgroundColor: '#e5e7eb', borderRadius: '8px', color: '#333' }}>
                            No listings found for your account. Click **List a New Property** to create one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
  
export default LandlordDashboard;