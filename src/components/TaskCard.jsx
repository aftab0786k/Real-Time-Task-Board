import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, getUserInitials, getPriorityColor } from '@/lib/utils';
import { updateTask, deleteTask } from '@/redux/thunks';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const TaskCard = ({ task, boardId, isDragging }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTask, setEditedTask] = React.useState({ ...task });

  const assignee = users[task.assignee];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(updateTask(boardId, editedTask));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(boardId, task.id));
    setIsEditing(false);
  };

  return (
    <Card 
      className={`mb-3 border-0 shadow-sm transition-all duration-200 ${
        isDragging 
          ? 'scale-95 opacity-70 shadow-lg ring-2 ring-purple-400' 
          : 'hover:shadow-md hover:-translate-y-0.5 hover:border-purple-100'
      }`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start space-x-2">
          <CardTitle className="text-base font-semibold line-clamp-2 text-gray-800">
            {task.title}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`px-2 py-0.5 text-xs rounded-full ${
              task.priority === 'high' 
                ? 'bg-red-50 text-red-600 border-red-200' 
                : task.priority === 'medium' 
                  ? 'bg-amber-50 text-amber-600 border-amber-200' 
                  : 'bg-green-50 text-green-600 border-green-200'
            }`}
          >
            {task.priority || 'medium'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {task.description || 'No description provided'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {assignee ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                  {assignee.photoURL ? (
                    <AvatarImage src={assignee.photoURL} alt={assignee.displayName} />
                  ) : (
                    <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      {getUserInitials(assignee.displayName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-xs text-gray-500">{assignee.displayName.split(' ')[0]}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Avatar className="h-7 w-7 border-2 border-white shadow-sm bg-gray-100">
                  <AvatarFallback className="text-xs text-gray-500">?</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">Unassigned</span>
              </div>
            )}
          </div>
          {task.dueDate && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              new Date(task.dueDate) < new Date() 
                ? 'bg-red-50 text-red-600' 
                : 'bg-blue-50 text-blue-600'
            }`}>
              {formatDate(task.dueDate)}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full"
              onClick={handleEdit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-xl border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 w-full"></div>
            <DialogHeader className="px-6 pt-4">
              <DialogTitle className="text-xl font-bold text-gray-800">
                {isEditing ? 'Edit Task' : 'Task Details'}
              </DialogTitle>
            </DialogHeader>
            {isEditing ? (
              <div className="space-y-4 px-6 py-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input 
                    value={editedTask.title} 
                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                    className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea 
                    value={editedTask.description} 
                    onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                    className="focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                    <Select 
                      value={editedTask.assignee || ''}
                      onValueChange={(value) => setEditedTask({...editedTask, assignee: value})}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(users).map((user) => (
                          <SelectItem key={user.uid} value={user.uid}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                {user.photoURL ? (
                                  <AvatarImage src={user.photoURL} />
                                ) : (
                                  <AvatarFallback className="text-xs">
                                    {getUserInitials(user.displayName)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <span>{user.displayName}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <Select 
                      value={editedTask.priority || 'medium'}
                      onValueChange={(value) => setEditedTask({...editedTask, priority: value})}
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>Low</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span>Medium</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span>High</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <Input 
                    type="date" 
                    value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().substring(0, 10) : ''}
                    onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                    className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 px-6 py-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {task.description || 'No description provided'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Assignee</h4>
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                      {assignee ? (
                        <>
                          <Avatar className="h-8 w-8">
                            {assignee.photoURL ? (
                              <AvatarImage src={assignee.photoURL} />
                            ) : (
                              <AvatarFallback className="text-xs bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                                {getUserInitials(assignee.displayName)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-sm text-gray-700">{assignee.displayName}</span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Unassigned</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Priority</h4>
                    <div className={`text-sm capitalize p-3 rounded-lg ${
                      task.priority === 'high' 
                        ? 'bg-red-50 text-red-600' 
                        : task.priority === 'medium' 
                          ? 'bg-amber-50 text-amber-600' 
                          : 'bg-green-50 text-green-600'
                    }`}>
                      {task.priority || 'medium'}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Due Date</h4>
                    <div className={`text-sm p-3 rounded-lg ${
                      task.dueDate && new Date(task.dueDate) < new Date() 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Created</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {formatDate(task.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="px-6 pb-4">
              {isEditing ? (
                <div className="flex justify-between w-full">
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    className="hover:bg-red-600 hover:shadow-md"
                  >
                    Delete Task
                  </Button>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg w-full"
                >
                  Edit Task
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;