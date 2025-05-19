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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 bg-gradient-to-r from-slate-900 to-indigo-900"></div>
          <p className="text-lg font-medium text-cyan-100 animate-pulse">Loading your board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-indigo-900 p-6">
        <div className="max-w-md w-full bg-gradient-to-br from-slate-800 to-indigo-800 p-6 rounded-xl shadow-2xl border-l-4 border-rose-500">
          <h3 className="text-lg font-bold text-rose-400 mb-2">Error Loading Board</h3>
          <p className="text-cyan-100 mb-4">{error}</p>
          <Button 
            onClick={() => dispatch(fetchBoard(boardId))}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 md:p-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
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
                    className="min-w-[280px] h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800/80 to-indigo-800/80 backdrop-blur-sm border-2 border-dashed border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl p-6"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-3 shadow-md">
                      <Plus className="h-6 w-6 text-slate-900" />
                    </div>
                    <span className="text-cyan-100 font-medium text-lg">Add New Column</span>
                    <span className="text-cyan-400/80 text-sm mt-1">Click to create</span>
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-slate-800 to-indigo-800 rounded-xl border-0 shadow-2xl overflow-hidden max-w-md">
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 h-2 w-full"></div>
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle className="text-2xl font-bold text-cyan-100">
                    Create New Column
                  </DialogTitle>
                  <p className="text-cyan-400/80 text-sm mt-1">Organize your workflow with a new column</p>
                </DialogHeader>
                <div className="px-6 py-4">
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Column Title</label>
                  <Input
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="e.g. 'In Progress'"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all placeholder:text-slate-500"
                    autoFocus
                  />
                </div>
                <DialogFooter className="px-6 pb-6">
                  <div className="flex space-x-3 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDialog(false)}
                      className="w-1/2 border-slate-600 bg-transparent hover:bg-slate-700/50 text-cyan-100 hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddColumn}
                      disabled={!newColumnTitle.trim()}
                      className="w-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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