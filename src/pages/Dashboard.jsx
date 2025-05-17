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
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 bg-gradient-to-r from-white to-blue-50 border border-blue-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Task Board
                </h1>
                <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Board ID: {boardId}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 h-[calc(100vh-180px)] border border-blue-100">
              <Board boardId={boardId} />
            </div>
          </div>
        </main>
        <aside className="w-72 bg-white p-4 hidden lg:block overflow-y-auto border-l border-blue-100 shadow-sm bg-gradient-to-b from-white to-blue-50">
          <div className="sticky top-0">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Online Users</h2>
            <div className="border-t border-blue-100 pt-4">
              <OnlineUsers />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;