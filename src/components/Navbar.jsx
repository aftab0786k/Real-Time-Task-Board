import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/thunks';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUserInitials } from '@/lib/utils';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 shadow-lg border-b border-indigo-800/50">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand Section */}
          <div className="flex items-center flex-1">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-cyan-400/20">
                <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-md">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-6 w-6 text-white"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="2" x2="9" y2="4"></line>
                    <line x1="15" y1="2" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="22"></line>
                    <line x1="15" y1="20" x2="15" y2="22"></line>
                    <line x1="20" y1="9" x2="22" y2="9"></line>
                    <line x1="20" y1="14" x2="22" y2="14"></line>
                    <line x1="2" y1="9" x2="4" y2="9"></line>
                    <line x1="2" y1="14" x2="4" y2="14"></line>
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 tracking-tight">
                TaskBoard
                <span className="text-cyan-300">.</span>
              </span>
            </div>
          </div>

          {/* User/Auth Section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 md:space-x-5">
                <span className="hidden lg:inline-block text-sm font-medium text-cyan-100 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-sm">
                  {user.displayName}
                </span>
                <div className="relative group">
                  <Avatar className="h-9 w-9 border-2 border-slate-800 shadow-lg group-hover:border-cyan-400 transition-all duration-300">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-900 font-medium">
                        {getUserInitials(user.displayName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-slate-900 rounded-full h-3 w-3"></div>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-br from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-cyan-100 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600"
                >
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="sm:hidden text-cyan-100 hover:text-white hover:bg-slate-800/50 rounded-full"
                  aria-label="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  className="border-slate-700 text-cyan-100 hover:border-cyan-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 px-4 py-2 rounded-lg"
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-500 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;