import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router';

// API Configuration
import { API_BASE_URL } from '../../../API_MODULES/API_ADDRESS';
// API Service
const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials for cookie-based auth
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Password reset request failed (${response.status})`);
  }

  return response.json();
};

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await requestPasswordReset(email);
      console.log('Password reset requested:', response);
      setEmailSent(true);
      setSuccess(`Password reset link sent to ${email}! Check your inbox and spam folder.`);
      setTimeout(() => {
        navigate('/reset');
      }, 3000);
    } catch (error) {
      setError(error.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // You can implement navigation logic here
    console.log('Navigate back to login');
    navigate('/login');
  };

  let navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive a password reset link</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={emailSent}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || emailSent}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Reset Link...
                </div>
              ) : emailSent ? (
                'Email Sent ✓'
              ) : (
                'Send Reset Link'
              )}
            </button>

            {emailSent && (
              <button
                type="button"
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                  setSuccess('');
                  setError('');
                }}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
              >
                Send Another Email
              </button>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-3">
          <button 
            onClick={handleBackToLogin}
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
          
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-200 flex-grow"></div>
            <span className="px-3 text-xs text-gray-500 bg-gradient-to-br from-indigo-100 via-white to-purple-100">or</span>
            <div className="border-t border-gray-200 flex-grow"></div>
          </div>
          
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors
              " onClick={() => navigate('/')}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;