import React from "react";
import { useState } from "react";
import { User, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { API_BASE_URL } from "../../API_MODULES/API_ADDRESS";
import { useNavigate } from "react-router";

const Display = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const apiCall = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cookie-based auth
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        } else if (response.status === 403) {
          throw new Error(
            "Access denied. You don't have permission to view this profile."
          );
        } else if (response.status === 404) {
          throw new Error("User profile not found.");
        } else {
          throw new Error(
            `Failed to fetch profile (Status: ${response.status})`
          );
        }
      }

      const data = await response.json();
      console.log("User profile data:", data);

      setUserData(data);
      setError("");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setUserData(null);
    setError("");
  };
  let navigate = useNavigate();

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full justify-center flex flex-col items-center">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          <p className="text-gray-600">
            Fetch and display user profile information
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={apiCall}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Fetch Profile
              </>
            )}
          </button>

          {(userData || error) && (
            <button
              onClick={clearData}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-800 font-medium mb-1">Error</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* User Data Display */}
        {userData && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Profile Information
            </h3>
            <div className="space-y-2">
              {Object.entries(userData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="text-gray-600 font-medium capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </span>
                  <span className="text-gray-900 font-mono text-sm">
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Message */}
        {!loading && !userData && !error && (
          <div className="text-center py-8">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              Click "Fetch Profile" to load user data
            </p>
          </div>
        )}

        {/* Raw Data (for debugging) */}
        {userData && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              Show Raw JSON Data
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default Display;
