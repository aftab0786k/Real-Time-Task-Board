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
    <header className="bg-gradient-to-r from-white via-purple-50 to-indigo-50 shadow-sm border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand Section */}
          <div className="flex items-center flex-1">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 shadow-lg transform hover:scale-105 transition-transform duration-200">
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
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 tracking-tight">
                TaskBoard
                <span className="text-blue-400">.</span>
              </span>
            </div>
          </div>

          {/* User/Auth Section */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 md:space-x-5">
                <span className="hidden lg:inline-block text-sm font-medium text-gray-700 bg-white/50 px-3 py-1 rounded-full border border-gray-200">
                  {user.displayName}
                </span>
                <div className="relative group">
                  <Avatar className="h-9 w-9 border-2 border-white shadow-md group-hover:border-purple-300 transition-all duration-300">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-medium">
                        {getUserInitials(user.displayName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-white rounded-full h-3 w-3"></div>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-br from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg"
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
                  className="sm:hidden text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full"
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
                  className="border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 px-4 py-2 rounded-lg"
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-br from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-lg"
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