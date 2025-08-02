import React, { useState } from 'react';
import { ArrowRight, Key, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'; // Import Lucide icons
import { API_BASE_URL } from '../../../API_MODULES/API_ADDRESS';
import { useNavigate } from 'react-router';

// Main App component
function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', or ''
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [userData, setUserData] = useState(null); // New state for user data

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');
    setLoading(true); // Set loading to true when starting the request
    setUserData({ resetToken: resetToken.trim(), newPassword: newPassword.trim() }); // Store user data in state

    try {
      const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials for cookie-based auth
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // If the response is successful (status 200-299)
        const data = await response.json(); // Parse the JSON response
        setMessage(data.message || 'Password reset successfully!');
        setMessageType('success');
        setResetToken(''); // Clear inputs on success
        setNewPassword('');
      } else {
        // If the response is an error
        const errorData = await response.json(); // Attempt to parse error message from response
        console.log(userData);
        setMessage(errorData.message || 'Failed to reset password. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during password reset:', error);
      setMessage('An error occurred. Please check your network connection and try again.');
      setMessageType('error');
    } finally {
      setLoading(false); // Always set loading to false after the request
    }
  };

  let navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header section with icon and title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-600 p-3 rounded-full mb-4 shadow-md">
            <ArrowRight className="w-8 h-8 text-white" /> {/* Lucide ArrowRight icon */}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-center">Sign in to your account to continue</p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reset Token Input */}
          <div>
            <label htmlFor="reset-token" className="block text-sm font-medium text-gray-700 mb-1">
              Reset Token
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-gray-400" /> {/* Lucide Key icon */}
              </div>
              <input
                type="text"
                id="reset-token"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your reset token"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* New Password Input */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" /> {/* Lucide Lock icon */}
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="new-password"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" onClick={() => setShowPassword(false)} /> // Lucide EyeOff icon
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" onClick={() => setShowPassword(true)} /> // Lucide Eye icon
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Message display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg flex items-center ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle className="h-6 w-6 mr-3" /> // Lucide CheckCircle icon
            ) : (
              <XCircle className="h-6 w-6 mr-3" /> // Lucide XCircle icon
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Footer link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500"
          onClick={() => navigate("/login")}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
