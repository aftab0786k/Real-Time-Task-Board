import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getUserInitials } from '@/lib/utils';

const OnlineUsers = () => {
  const { users, onlineUsers } = useSelector(state => state.users);
  const onlineUsersList = onlineUsers.map(userId => users[userId]).filter(Boolean);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Online Team Members</h3>
      </div>
      <div className="p-4">
        {onlineUsersList.length > 0 ? (
          <div className="space-y-3">
            {onlineUsersList.map(user => (
              <div 
                key={user.uid} 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-white shadow">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        {getUserInitials(user.displayName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{user.displayName}</p>
                  <p className="text-xs text-green-600 font-medium">Online now</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No team members online</p>
            <p className="text-xs text-gray-400 mt-1">They'll appear here when active</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineUsers;