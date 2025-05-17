import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, registerUser } from '@/redux/thunks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      dispatch(login(formData.email, formData.password));
    } else {
      dispatch(registerUser(formData.email, formData.password, formData.displayName));
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 h-2 w-full"></div>
        <CardHeader className="text-center space-y-4 px-8 pt-10 pb-6">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to access your dashboard' : 'Get started with your free account'}
          </p>
        </CardHeader>
        <CardContent className="px-8 py-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">
              <p>{error === "Firebase: Error (auth/invalid-credential)." ? "Invalid email or password." : error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="displayName">
                  Full Name
                </label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span className="text-lg">{isLogin ? 'Sign In' : 'Sign Up'}</span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-8 pt-2">
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">
                {isLogin ? 'New here?' : 'Already have an account?'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleForm}
            className="w-full text-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded px-3 py-2"
          >
            {isLogin ? 'Create new account →' : '← Sign in instead'}
          </button>
          <div className="text-xs text-center text-gray-500 mt-2">
            By continuing, you agree to our <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Terms</a> and <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Privacy Policy</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;