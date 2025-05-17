import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { fetchBoard, moveTaskThunk, addColumn } from '@/redux/thunks';
import Column from './Column';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Board = ({ boardId = 'default-board' }) => {
  const dispatch = useDispatch();
  const { columns, tasks, loading, error } = useSelector(state => state.board);
  const [newColumnTitle, setNewColumnTitle] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [dispatch, boardId]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === 'task') {
      dispatch(moveTaskThunk(boardId, draggableId, source, destination));
    }
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === '') return;

    dispatch(addColumn(boardId, {
      id: generateId(),
      title: newColumnTitle
    }));

    setNewColumnTitle('');
    setShowDialog(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 bg-gradient-to-r from-white to-purple-50"></div>
          <p className="text-lg font-medium text-purple-600 animate-pulse">Loading your board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-purple-50 p-6">
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-red-600 mb-2">Error Loading Board</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button 
            onClick={() => dispatch(fetchBoard(boardId))}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
          <div className="flex space-x-5 md:space-x-6 min-h-[calc(100vh-150px)]">
            {columns.map(column => {
              const columnTasks = column.taskIds.map(taskId => tasks[taskId]).filter(Boolean);
              return (
                <Column 
                  key={column.id} 
                  column={column} 
                  tasks={columnTasks}
                  boardId={boardId}
                />
              );
            })}

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <div className="flex-shrink-0">
                  <Button 
                    variant="ghost"
                    className="min-w-[280px] h-full flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-white/95 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md p-6"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mb-3">
                      <Plus className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-purple-600 font-medium text-lg">Add New Column</span>
                    <span className="text-gray-500 text-sm mt-1">Click to create</span>
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-xl border-0 shadow-2xl overflow-hidden max-w-md">
                <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 h-2 w-full"></div>
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    Create New Column
                  </DialogTitle>
                  <p className="text-gray-500 text-sm mt-1">Organize your workflow with a new column</p>
                </DialogHeader>
                <div className="px-6 py-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Column Title</label>
                  <Input
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="e.g. 'In Progress'"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                </div>
                <DialogFooter className="px-6 pb-6">
                  <div className="flex space-x-3 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDialog(false)}
                      className="w-1/2 border-gray-300 hover:bg-gray-50 text-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddColumn}
                      disabled={!newColumnTitle.trim()}
                      className="w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                    >
                      Create Column
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;