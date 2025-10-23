import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../API_MODULES/API_ADDRESS";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getUserDetails = async () => {
    const details = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    const userDetails = await details.json();
    console.log("userDetails", userDetails.user);
    setEmail(userDetails.user.email);
    setFullName(userDetails.user.shippingInformation.fullName);
    setCity(userDetails.user.shippingInformation.city);
    setStreet(userDetails.user.shippingInformation.address);
    setZipCode(userDetails.user.shippingInformation.zipCode);
    setOrders(userDetails.user.orders || []);
    setPaymentMethods(userDetails.user.paymentMethods || []);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const updateUserDetails = async (updatedData) => {};

  return (
    <div className="min-h-screen bg-gray-100 py-12 md:pt-44">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#1e1e1e] mb-8 text-center">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full text-left px-6 py-4 border-l-4 ${
                  activeTab === "personal"
                    ? "border-[#e59a0d] bg-[#fdf2c4]"
                    : "border-transparent"
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-6 py-4 border-l-4 ${
                  activeTab === "orders"
                    ? "border-[#e59a0d] bg-[#fdf2c4]"
                    : "border-transparent"
                }`}
              >
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`w-full text-left px-6 py-4 border-l-4 ${
                  activeTab === "address"
                    ? "border-[#e59a0d] bg-[#fdf2c4]"
                    : "border-transparent"
                }`}
              >
                Delivery Address
              </button>
              <button
                onClick={() => setActiveTab("payment")}
                className={`w-full text-left px-6 py-4 border-l-4 ${
                  activeTab === "payment"
                    ? "border-[#e59a0d] bg-[#fdf2c4]"
                    : "border-transparent"
                }`}
              >
                Payment Method
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-6 py-4 border-l-4 border-transparent cursor-pointer flex items-center text-[#515050]"
              >
                Log Out{" "}
                <span className="ml-2">
                  <LogOut />
                </span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div>
                  <form>
                    <div className="mb-6">
                      <label className="block text-[#515050] mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          name="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                          {fullName}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-[#515050] mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                          {email}
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="py-2 px-6 bg-[#e59a0d] text-white rounded-md"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(user);
                          }}
                          className="py-2 px-6 bg-gray-200 text-[#515050] rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="py-2 px-6 bg-[#e59a0d] text-white rounded-md flex items-center"
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </form>
                </div>
              )}
              {/* Address Tab */}
              {activeTab === "address" && (
                <div>
                  <form>
                    <div className="mb-6">
                      <label className="block text-[#515050] mb-2">
                        Street Address
                      </label>
                      {isEditing ? (
                        <input
                          name="street"
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                          {street}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-[#515050] mb-2">City</label>
                      {isEditing ? (
                        <input
                          name="city"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                          {city}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-[#515050] mb-2">
                        Zip Code
                      </label>
                      {isEditing ? (
                        <input
                          name="zipCode"
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                          {zipCode}
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="py-2 px-6 bg-[#e59a0d] text-white rounded-md"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setStreet(user.address.street);
                            setCity(user.address.city);
                            setZipCode(user.address.zipCode);
                          }}
                          className="py-2 px-6 bg-gray-200 text-[#515050] rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="py-2 px-6 bg-[#e59a0d] text-white rounded-md flex items-center"
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </form>
                </div>
              )}
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-bold text-[#1e1e1e] mb-6">
                    Order History
                  </h2>

                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#515050] mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <button className="py-2 px-6 bg-[#e59a0d] text-white rounded-md">
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {user.orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-[#515050]">
                                {order.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                £{order.total.toFixed(2)}
                              </p>
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="p-4 space-y-4">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center border-b pb-2 last:border-0"
                              >
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-[#515050]">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium">
                                  £{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="bg-gray-50 p-4 border-t text-right">
                            <button className="text-[#e59a0d] hover:underline">
                              View Order Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Payment Tab */}
              {activeTab === "payment" && (
                <div>
                  <h2 className="text-xl font-bold text-[#1e1e1e] mb-6">
                    Payment Methods
                  </h2>

                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#515050] mb-4">
                        You don't have any payment methods saved.
                      </p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="py-2 px-6 bg-[#e59a0d] text-white rounded-md"
                      >
                        Add Payment Method
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                            <div>
                              <p className="font-medium">{method.type}</p>
                              <p className="text-sm text-[#515050]">
                                **** **** **** {method.lastFour}
                              </p>
                              <p className="text-sm text-[#515050]">
                                Expires: {method.expiryDate}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setIsEditing(true);
                                  setSelectedMethod(method);
                                }}
                                className="py-1 px-3 bg-gray-200 text-[#515050] rounded-md text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemoveMethod(method.id)}
                                className="py-1 px-3 bg-red-100 text-red-600 rounded-md text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setSelectedMethod(null);
                        }}
                        className="py-2 px-6 bg-[#e59a0d] text-white rounded-md"
                      >
                        Add New Payment Method
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
