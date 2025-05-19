import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getUserInitials } from '@/lib/utils';

const OnlineUsers = () => {
  const { users, onlineUsers } = useSelector(state => state.users);
  const onlineUsersList = onlineUsers.map(userId => users[userId]).filter(Boolean);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-white flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span>Team Activity</span>
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
            {onlineUsersList.length} online
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4 sm:p-5">
        {onlineUsersList.length > 0 ? (
          <div className="space-y-3">
            {onlineUsersList.map(user => (
              <div 
                key={user.uid} 
                className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 border border-gray-100 dark:border-slate-600 group"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-white dark:border-slate-800 shadow-md group-hover:border-cyan-200 dark:group-hover:border-cyan-400 transition-colors duration-200">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-medium">
                        {getUserInitials(user.displayName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400 border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{user.displayName}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active now</span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">•</span>
                    <span className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.role || 'Team member'}</span>
                  </div>
                </div>
                <button 
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors duration-200"
                  aria-label={`Message ${user.displayName}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 flex items-center justify-center mb-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-500 dark:text-cyan-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            </div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">No active team members</h4>
            <p className="text-xs text-gray-500 dark:text-slate-500 max-w-xs mx-auto">
              When your team comes online, they'll appear here for quick collaboration
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {onlineUsersList.length > 0 && (
        <div className="px-4 py-3 sm:px-5 sm:py-3 bg-gray-50 dark:bg-slate-700/30 border-t border-gray-100 dark:border-slate-700">
          <button className="w-full flex items-center justify-center space-x-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors duration-200">
            <span>Start group chat</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;