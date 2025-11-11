import React from 'react';
import { Home, Search, User, LogOut, Moon, Sun } from 'lucide-react';

const Navbar = ({ view, user, userType, handleSignOut, setCurrentView, darkMode, setDarkMode }) => (
    <nav className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-md border-b border-white/10' : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'} shadow-sm p-4 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" 
                onClick={() => setCurrentView(user ? (user.type === 'student' ? 'browse' : 'landlord-dashboard') : 'home')}
            >
                <Home className="text-indigo-600" size={28} />
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>CampusStay</h1>
            </div>
            <div className="flex items-center gap-4">
                {userType === 'landlord' && view === 'landlord-dashboard' && (
                  <button
                    onClick={() => setCurrentView('browse')}
                    className={`${darkMode ? 'text-indigo-300 hover:text-indigo-100' : 'text-indigo-600 hover:text-indigo-800'} transition flex items-center gap-1 text-sm font-medium`}
                  >
                    <Search size={18} />
                    View Student Portal
                  </button>
                )}
                
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {user ? (
                    <button
                        onClick={handleSignOut}
                        className={`flex items-center gap-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition`}
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentView('auth')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                        <User size={20} />
                        Sign In / Up
                    </button>
                )}
            </div>
        </div>
    </nav>
);

export default Navbar;