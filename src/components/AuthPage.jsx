import React, { useState } from 'react';
import { Users, Map } from 'lucide-react';

const AuthPage = ({ handleSignUp, handleSignIn, setCurrentView }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [selectedType, setSelectedType] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            handleSignUp(email, password, selectedType);
        } else {
            handleSignIn(email, password);
        }
    };

    const containerStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' };
    const boxStyle = { padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '90%' };
    const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
    const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                    {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                </h2>

                {isSignUp && (
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>I am a:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setSelectedType('student')}
                                style={{ padding: '15px', border: selectedType === 'student' ? '2px solid #4f46e5' : '1px solid #ccc', borderRadius: '8px', backgroundColor: selectedType === 'student' ? '#eff6ff' : 'white' }}
                            >
                                <Users style={{ margin: '0 auto', display: 'block', color: '#4f46e5' }} size={28} />
                                <div style={{ fontWeight: 'medium' }}>Student</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedType('landlord')}
                                style={{ padding: '15px', border: selectedType === 'landlord' ? '2px solid #4f46e5' : '1px solid #ccc', borderRadius: '8px', backgroundColor: selectedType === 'landlord' ? '#eff6ff' : 'white' }}
                            >
                                <Map style={{ margin: '0 auto', display: 'block', color: '#4f46e5' }} size={28} />
                                <div style={{ fontWeight: 'medium' }}>Landlord</div>
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
                    </div>
                    <button type="submit" style={buttonStyle}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <button onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#4f46e5', border: 'none', background: 'transparent', cursor: 'pointer', textDecoration: 'underline' }}>
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
                
                <button onClick={() => setCurrentView('home')} style={{ width: '100%', marginTop: '15px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#4f46e5' }}>
                    ← Back to Home
                </button>
            </div>
        </div>
    );
};

export default AuthPage;