import React, { useState } from 'react';
import { ArrowRight, Key, Lock, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// API Configuration
import { API_BASE_URL } from '../../../API_MODULES/API_ADDRESS';
// Main Reset Password component
function ResetPassword({ onNavigate = null }) {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', or ''
  const [loading, setLoading] = useState(false);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');
    setLoading(true);

    // 🔧 FIX 1: Validate inputs before making API call
    if (!resetToken.trim()) {
      setMessage('Please enter your reset token');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!newPassword.trim()) {
      setMessage('Please enter a new password');
      setMessageType('error');
      setLoading(false);
      return;
    }

    // 🔧 FIX 2: Create request body directly in the fetch call
    // This was the main bug - userData state was being set but used before state update
    const requestBody = {
      resetToken: resetToken.trim(),
      newPassword: newPassword.trim()
    };

    console.log('Sending request with:', { 
      resetToken: resetToken.trim().substring(0, 10) + '...', // Log partial token for debugging
      passwordLength: newPassword.length 
    });

    try {
      const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody), // 🔧 FIX 3: Use local variable instead of state
      });

      // 🔧 FIX 4: Handle response parsing more carefully
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        data = {}; // Fallback to empty object
      }

      if (response.ok) {
        // Success case
        console.log('Password reset successful:', data);
        setMessage(data.message || 'Password reset successfully!');
        setMessageType('success');
        setResetToken(''); // Clear inputs on success
        setNewPassword('');

        // 🔧 FIX 5: Auto-redirect after success
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('/login');
          } else {
            console.log('Navigate to login page');
          }
        }, 3000);

      } else {
        // 🔧 FIX 6: Better error handling based on status codes
        console.error('Reset password failed:', {
          status: response.status,
          statusText: response.statusText,
          data
        });

        let errorMessage;
        switch (response.status) {
          case 400:
            errorMessage = data.message || 'Invalid reset token or password format';
            break;
          case 401:
            errorMessage = 'Reset token is invalid or has expired';
            break;
          case 404:
            errorMessage = 'Reset token not found. Please request a new reset link';
            break;
          case 422:
            errorMessage = data.message || 'Password does not meet requirements';
            break;
          case 429:
            errorMessage = 'Too many reset attempts. Please try again later';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = data.message || `Reset failed (${response.status}). Please try again`;
        }
        
        setMessage(errorMessage);
        setMessageType('error');
        console.log(requestBody);
      }
    } catch (error) {
      // 🔧 FIX 7: Better network error handling
      console.error('Network error during password reset:', error);
      
      let errorMessage;
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again';
      } else if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again';
      } else {
        errorMessage = 'An unexpected error occurred. Please try again';
      }
      
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    if (onNavigate) {
      navigate('/login');
    } else {
      console.log('Navigate to login');
    }
  };
let navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header section with icon and title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-600 p-3 rounded-full mb-4 shadow-md">
            <Lock className="w-8 h-8 text-white" /> {/* Changed from ArrowRight to Lock for better context */}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-500 text-center">Enter your reset token and new password</p>
        </div>

        {/* Form section - 🔧 FIX 8: Converted form to div for artifact compatibility */}
        <div className="space-y-6">
          {/* Reset Token Input */}
          <div>
            <label htmlFor="reset-token" className="block text-sm font-medium text-gray-700 mb-1">
              Reset Token *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="reset-token"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Enter your reset token"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                disabled={loading}
                maxLength={200} // 🔧 FIX 9: Add reasonable limits
              />
            </div>
            {/* 🔧 FIX 10: Add helpful hint */}
            <p className="mt-1 text-xs text-gray-500">
              Check your email for the reset token sent to you
            </p>
          </div>

          {/* New Password Input */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="new-password"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                minLength={8} // 🔧 FIX 11: Add password requirements
                maxLength={128}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>
            {/* 🔧 FIX 12: Add password requirements hint */}
            <p className="mt-1 text-xs text-gray-500">
              Minimum 8 characters with uppercase, lowercase, number, and special character
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !resetToken.trim() || !newPassword.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Resetting Password...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </div>

        {/* Message display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-medium ${
                messageType === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message}
              </p>
              {messageType === 'success' && (
                <p className="text-xs text-green-600 mt-1">
                  Redirecting to login page in 3 seconds...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <button
            type="button"
            onClick={handleNavigateToLogin}
            className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
            disabled={loading}
          >
            Sign In
          </button>
        </div>

        {/* 🔧 FIX 13: Add debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
            <strong>Debug Info:</strong><br />
            API URL: {API_BASE_URL}/users/reset-password<br />
            Token Length: {resetToken.length}<br />
            Password Length: {newPassword.length}
          </div>
        )}
      </div>
    </div>
  );
}

// Demo wrapper
export default function App() {
  const handleNavigation = (path) => {
    console.log('Navigate to:', path);
    alert(`Navigation to: ${path}`);
  };

  return (
    <ResetPassword onNavigate={handleNavigation} />
  );
}