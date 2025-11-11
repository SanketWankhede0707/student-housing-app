import React from 'react';
import { Home, Search, User, LogOut } from 'lucide-react';

const Navbar = ({ view, user, userType, handleSignOut, setCurrentView }) => (
    <nav style={{ padding: '15px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            onClick={() => setCurrentView(user ? (user.type === 'student' ? 'browse' : 'landlord-dashboard') : 'home')}
        >
            <Home style={{ color: '#4f46e5' }} size={28} />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>CampusStay</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* View Switcher */}
            {userType === 'landlord' && view === 'landlord-dashboard' && (
              <button onClick={() => setCurrentView('browse')} style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#4f46e5' }}>
                <Search size={18} /> Student Portal
              </button>
            )}
            
            {/* Auth Buttons */}
            {user ? (
                <button onClick={handleSignOut} style={{ padding: '8px 15px', border: 'none', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', borderRadius: '4px' }}>
                    <LogOut size={20} /> Sign Out
                </button>
            ) : (
                <button onClick={() => setCurrentView('auth')} style={{ padding: '8px 15px', border: 'none', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white', borderRadius: '4px' }}>
                    <User size={20} /> Sign In / Up
                </button>
            )}
        </div>
    </nav>
);

export default Navbar;