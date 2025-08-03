import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/bg.png";
import logo from "../../assets/logo.png";
import { API_BASE_URL } from '../../../API_MODULES/API_ADDRESS';

function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (!resetToken.trim()) {
      setMessage('Please enter your reset token');
      setError('true');
      setLoading(false);
      return;
    }

    if (!newPassword.trim()) {
      setMessage('Please enter a new password');
      setError('true');
      setLoading(false);
      return;
    }

    const requestBody = {
      resetToken: resetToken.trim(),
      newPassword: newPassword.trim()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        data = {};
      }

      if (response.ok) {
        setMessage(data.message || 'Password reset successfully!');
        setError('');
        setResetToken('');
        setNewPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
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
            errorMessage = data.message || `Reset failed (${response.status})`;
        }
        setMessage(errorMessage);
        setError('true');
      }
    } catch (err) {
      console.error('Network error during password reset:', err);
      setMessage('Network error. Please check your internet connection and try again');
      setError('true');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-white bg-contain bg-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <img src={logo} className="mb-8 max-w-32" alt="Vysk Kitchen Logo" />

        <h1 className="text-2xl font-semibold text-[#515050] mb-4 text-center">
          Reset Your Password
        </h1>

        <p className="text-[#515050] text-center mb-8">
          Enter your reset token and new password
        </p>

        {message && (
          <p
            className={`mb-4 text-center ${
              error ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          {/* Reset Token Field */}
          <div className="mb-6">
            <label htmlFor="resetToken" className="block text-[#515050] mb-2">
              Reset Token
            </label>
            <input
              id="resetToken"
              type="text"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              placeholder="Enter your reset token"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#e59a0d] focus:ring-1 focus:ring-[#e59a0d] outline-none"
              required
            />
          </div>

          {/* New Password Field */}
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-[#515050] mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#e59a0d] focus:ring-1 focus:ring-[#e59a0d] outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#e59a0d] text-white rounded-md hover:bg-opacity-90 transition-colors mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>

        <p className="text-[#515050] mt-4 text-sm text-center">
          Remembered your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#e59a0d] hover:underline bg-transparent border-none p-0"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
