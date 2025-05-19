import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreVertical } from 'lucide-react';
import TaskCard from './TaskCard';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTask, moveTaskThunk } from '@/redux/thunks';
import { updateColumn } from '@/redux/slices/boardSlice';

const Column = ({ column, tasks, boardId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: column.id
  });

  const handleTitleChange = () => {
    if (newTitle.trim() === '') return;
    dispatch(updateColumn(boardId, { id: column.id, title: newTitle }));
    setIsEditing(false);
  };

  const handleCreateTask = () => {
    if (newTask.title.trim() === '') return;
    
    dispatch(createTask(boardId, newTask, column.id));
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: column.id
    });
    setIsCreatingTask(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg w-full max-w-[320px] min-w-[280px] border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out">
      {/* Column Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl">
        {isEditing ? (
          <div className="flex space-x-2 w-full">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleChange();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              className="focus:ring-2 focus:ring-white focus:border-transparent bg-white/90 backdrop-blur-sm"
            />
            <Button 
              size="sm" 
              onClick={handleTitleChange}
              className="bg-white text-indigo-600 hover:bg-white/90 shadow-md"
            >
              Save
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <h3 
                className="font-semibold text-white truncate max-w-[180px]" 
                onDoubleClick={() => setIsEditing(true)}
              >
                {column.title}
              </h3>
            </div>
            <span className="text-xs font-semibold text-indigo-100 px-2.5 py-1 bg-white/20 rounded-full backdrop-blur-sm">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </>
        )}
      </div>
      
      {/* Task List */}
      <Droppable droppableId={column.id} type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto p-3 transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-gradient-to-b from-indigo-50 to-purple-50' : ''
            }`}
            style={{ maxHeight: 'calc(100vh - 220px)' }}
          >
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-indigo-400" />
                </div>
                <p className="text-sm text-gray-500 font-medium">No tasks yet</p>
                <p className="text-xs text-gray-400 mt-1">Drag tasks here or click "Add task"</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-3 transition-transform duration-200 ${
                        snapshot.isDragging ? 'scale-105 shadow-xl rotate-1' : 'hover:scale-[1.01]'
                      }`}
                    >
                      <TaskCard 
                        task={task} 
                        boardId={boardId} 
                        isDragging={snapshot.isDragging} 
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      {/* Add Task Button */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
        <Dialog open={isCreatingTask} onOpenChange={setIsCreatingTask}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors duration-200 group"
            >
              <div className="flex items-center justify-center w-6 h-6 mr-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-200 group-hover:from-indigo-600 group-hover:to-purple-600">
                <Plus className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium">Add task</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-2xl border-0 shadow-2xl overflow-hidden max-w-md p-0">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 w-full"></div>
            <DialogHeader className="px-6 pt-5">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Create New Task
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 px-6 py-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <Input 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g. Complete project draft"
                  className="focus:ring-2 focus:ring-indigo-500 focus:border-transparent border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Task details..."
                  rows={3}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select 
                  value={newTask.priority} 
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="low" className="text-gray-700">Low</option>
                  <option value="medium" className="text-gray-700">Medium</option>
                  <option value="high" className="text-gray-700">High</option>
                </select>
              </div>
            </div>
            <DialogFooter className="px-6 pb-5 pt-3 bg-gray-50 rounded-b-2xl">
              <Button 
                variant="outline" 
                onClick={() => setIsCreatingTask(false)}
                className="border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTask}
                disabled={!newTask.title.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-md text-white disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Column;