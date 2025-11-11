import React, { useState } from 'react';
import { Users, Map } from 'lucide-react';

const AuthPage = ({ handleSignUp, handleSignIn, setCurrentView, darkMode }) => {
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

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center p-4`}>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl p-8 max-w-md w-full`}>
                <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                </h2>

                {isSignUp && (
                    <div className="mb-6">
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>I am a:</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setSelectedType('student')}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                    selectedType === 'student' ? 'border-indigo-500 bg-indigo-50/20' : darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                                } ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                                <Users className="mx-auto mb-2 text-indigo-500" size={28} />
                                <div className="font-medium">Student</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedType('landlord')}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                    selectedType === 'landlord' ? 'border-indigo-500 bg-indigo-50/20' : darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                                } ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                                <Map className="mx-auto mb-2 text-indigo-500" size={28} />
                                <div className="font-medium">Landlord</div>
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email (e.g., student@test.com or landlord@test.com)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password (any value for mock)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-indigo-500 hover:text-indigo-600 hover:underline transition text-sm"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
                
                <button
                    onClick={() => setCurrentView('home')}
                    className={`w-full mt-4 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-all text-sm md:text-base`}
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
};

export default AuthPage;