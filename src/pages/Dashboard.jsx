import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/redux/thunks';
import { setupSocketListeners, socket } from '@/lib/socket';
import Board from '@/components/Board';
import OnlineUsers from '@/components/OnlineUsers';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const boardId = 'JF8oVp7xahegRunsKZO3';
  
  useEffect(() => {
    // Fetch users
    dispatch(fetchUsers());
    
    // Setup socket listeners
    setupSocketListeners(dispatch);
    
    // Connect socket if user is authenticated
    if (user) {
      socket.auth = { userId: user.uid };
      socket.connect();
    }
    
    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [dispatch, user]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Navbar />
      
      {/* Mobile Sidebar Toggle Area */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <button className="p-2 rounded-md hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-medium">Team Activity</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-8xl mx-auto">
            {/* Dashboard Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200 bg-gradient-to-r from-white to-indigo-50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-100 rounded-full opacity-20"></div>
              <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-blue-100 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      Task Board
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">Collaborate with your team in real-time</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="text-xs md:text-sm text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Board ID: {boardId}
                    </div>
                    <button className="text-xs md:text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Share Board
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Board Container */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 min-h-[calc(100vh-220px)] md:min-h-[calc(100vh-240px)] border border-gray-200 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-100 rounded-full opacity-10"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-100 rounded-full opacity-10"></div>
              <div className="relative z-10">
                <Board boardId={boardId} />
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar - Hidden on mobile by default */}
        <aside className="fixed inset-y-0 right-0 w-72 bg-white p-4 transform translate-x-full lg:translate-x-0 lg:static lg:w-80 z-10 overflow-y-auto transition-transform duration-300 ease-in-out border-l border-gray-200 shadow-xl lg:shadow-none bg-gradient-to-b from-white to-indigo-50">
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm pb-4 pt-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Team Members
              </h2>
              <button className="lg:hidden p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-indigo-500">
                  {user?.displayName || 'Your'} Team
                </span>
              </div>
            </div>
            <OnlineUsers />
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar Overlay (visible when sidebar is open) */}
      <div className="fixed inset-0 bg-black/50 z-[5] lg:hidden opacity-0 pointer-events-none transition-opacity duration-300"></div>
    </div>
  );
};

export default Dashboard;