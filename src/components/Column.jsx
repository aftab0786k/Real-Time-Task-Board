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
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-md w-[300px] min-w-[300px] border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Column Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white rounded-t-xl">
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
              className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button 
              size="sm" 
              onClick={handleTitleChange}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Save
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"></div>
              <h3 
                className="font-semibold text-gray-800 truncate" 
                onDoubleClick={() => setIsEditing(true)}
              >
                {column.title}
              </h3>
            </div>
            <span className="text-xs font-medium text-purple-600 px-2 py-1 bg-purple-50 rounded-full">
              {tasks.length} tasks
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
            className={`flex-1 overflow-y-auto p-3 ${
              snapshot.isDraggingOver ? 'bg-gradient-to-b from-blue-50 to-blue-100' : ''
            }`}
            style={{ maxHeight: 'calc(100vh - 220px)' }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-3 ${snapshot.isDragging ? 'shadow-xl' : 'shadow-sm'}`}
                  >
                    <TaskCard 
                      task={task} 
                      boardId={boardId} 
                      isDragging={snapshot.isDragging} 
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      {/* Add Task Button */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
        <Dialog open={isCreatingTask} onOpenChange={setIsCreatingTask}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-xl border-0 shadow-xl overflow-hidden max-w-md">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 w-full"></div>
            <DialogHeader className="px-6 pt-4">
              <DialogTitle className="text-xl font-bold text-gray-800">
                Create New Task
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 px-6 py-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g. Complete project draft"
                  className="mt-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Input 
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Task details..."
                  className="mt-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <select 
                  value={newTask.priority} 
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full mt-2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <DialogFooter className="px-6 pb-4">
              <Button 
                variant="outline" 
                onClick={() => setIsCreatingTask(false)}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
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