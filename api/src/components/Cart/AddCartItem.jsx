import React, { useState } from 'react';
import { ShoppingCart, Package, DollarSign, PlusCircle } from 'lucide-react'; // Import Lucide icons
import { API_BASE_URL } from '../../../API_MODULES/API_ADDRESS';
// Main App component to host the AddCartItemForm
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-200 p-4 font-inter">
      <AddCartItemForm />
    </div>
  );
}

// AddCartItemForm component
function AddCartItemForm() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', or ''
  const [loading, setLoading] = useState(false);

  // Define your API endpoint for adding cart items

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');
    setLoading(true);

    // Basic validation
    if (!productId || quantity <= 0 || price <= 0) {
      setMessage('Please ensure Product ID is entered, and Quantity/Price are greater than 0.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: parseInt(quantity, 10), // Ensure quantity is an integer
          price: parseFloat(price), // Ensure price is a float
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Item added to cart successfully!');
        setMessageType('success');
        setProductId('');
        setQuantity(1); // Reset quantity
        setPrice('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to add item to cart. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setMessage('An error occurred. Please check your network connection and try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      {/* Header section with icon and title */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-teal-600 p-3 rounded-full mb-4 shadow-md">
          <ShoppingCart className="w-8 h-8 text-white" /> {/* Lucide ShoppingCart icon */}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add Item to Cart</h2>
        <p className="text-gray-500 text-center">Enter details for the item you want to add</p>
      </div>

      {/* Form section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product ID Input */}
        <div>
          <label htmlFor="product-id" className="block text-sm font-medium text-gray-700 mb-1">
            Product ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Package className="w-5 h-5 text-gray-400" /> {/* Lucide Package icon */}
            </div>
            <input
              type="text"
              id="product-id"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="e.g., PROD123"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Quantity Input */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PlusCircle className="w-5 h-5 text-gray-400" /> {/* Lucide PlusCircle icon */}
            </div>
            <input
              type="number"
              id="quantity"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="e.g., 1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" /> {/* Lucide DollarSign icon */}
            </div>
            <input
              type="number"
              id="price"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="e.g., 29.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01" // Allow decimal values for price
              min="0.01"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
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
            'Add to Cart'
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
            <CheckCircle className="h-6 w-6 mr-3" />
          ) : (
            <XCircle className="h-6 w-6 mr-3" />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
