import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png";
import bg from "../assets/bg.png";

export default function NotFoundPage() {
  const navigate = useNavigate()

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

        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 11-12.728 0M12 9v2m0 4h.01"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-[#515050] mb-4 text-center">
          404 - Page Not Found
        </h1>
        <p className="text-[#515050] text-center mb-6">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-block py-3 px-6 bg-[#e59a0d] text-white rounded-md hover:bg-opacity-90 transition-colors mb-2"
        >
          Go to Homepage
        </button>

        <p className="text-[#515050] text-sm text-center mt-6">
          Need help? Visit our{' '}
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="text-[#e59a0d] hover:underline"
          >
            Help Center
          </button>{' '}
          or reach out to customer service.
        </p>
      </div>
    </div>
  )
}
