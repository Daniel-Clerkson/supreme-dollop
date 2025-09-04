import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../../API_MODULES/API_ADDRESS'
import logo from "../../assets/logo.png";
import bg from "../../assets/bg.png";

// API Service
async function requestPasswordReset(email) {
  const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `Password reset request failed (${response.status})`
    )
  }

  return response.json()
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError('')

    try {
      await requestPasswordReset(email)
      console.log('Password reset requested for:', email)
      setIsSubmitted(true)
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTryAgain = async () => {
    if (!email) return

    setIsSubmitting(true)
    setError('')

    try {
      await requestPasswordReset(email)
      console.log('Password reset requested again for:', email)
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.')
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-white bg-contain bg-repeat`}
          style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <img
            src={logo}
            alt="VY's KITCHEN Logo"
            width={180}
            height={80}
          />
        </div>

        <h1 className="text-2xl font-semibold text-[#515050] mb-4 text-center">
          Reset Your Password
        </h1>

        {!isSubmitted ? (
          <>
            <p className="text-[#515050] text-center mb-8">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <label htmlFor="email" className="block text-[#515050] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[#e59a0d] focus:ring-1 focus:ring-[#e59a0d] outline-none"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#e59a0d] text-white rounded-md hover:bg-opacity-90 transition-colors mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Send Reset Instructions'}
              </button>
            </form>

            <p className="text-[#515050] text-center">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#e59a0d] hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-medium text-[#515050] mb-4">
              Check Your Email
            </h2>
            <p className="text-[#515050] mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {
              setTimeout(() => {
                navigate('/reset')
              }, 5000 )
              // This will reset the form after 5 seconds
            }

            <p className="text-[#515050] mb-8">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                type="button"
                onClick={handleTryAgain}
                disabled={isSubmitting}
                className="text-[#e59a0d] hover:underline disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'sending...' : 'try again'}
              </button>
              .
            </p>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-block py-3 px-6 bg-[#e59a0d] cursor-pointer text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Back to Login
            </button>
          </div>
        )}

        <div className="mt-8">
          <p className="text-[#515050] text-sm text-center">
            For further support, you may visit the{' '}
            <button
              type="button"
              onClick={() => navigate('/help')}
              className="text-[#e59a0d] hover:underline"
            >
              Help Center
            </button>{' '}
            or contact our customer service team.
          </p>
        </div>
      </div>
    </div>
  )
}