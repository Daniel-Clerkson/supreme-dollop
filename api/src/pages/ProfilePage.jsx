import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../API_MODULES/API_ADDRESS";
import { toast, ToastContainer } from "react-toastify";
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [orders, setOrders] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const updatedFormData = {
    phone: phoneNumber,
    shippingInformation: {
      fullName,
      city,
      address,
      zipCode,
    },
  };

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

  // Remove a card by ID
  function handleRemoveMethod(cardId) {
    const storedCards = JSON.parse(localStorage.getItem("paymentCards")) || [];

    const updatedCards = storedCards.filter((card) => card.id !== cardId);

    localStorage.setItem("paymentCards", JSON.stringify(updatedCards));
    paymentMethods += updatedCards;
    console.log(`Card with ID ${cardId} removed.`);
  }

  // Create a new card object
  const card = {
    id: Date.now(),
    cardName,
    cardNumber,
    expiryDate,
    cvv,
  };

  // Save a new card to localStorage
  const saveCardDetails = () => {
    const storedCards = JSON.parse(localStorage.getItem("paymentCards")) || [];
    storedCards.push(card);
    localStorage.setItem("paymentCards", JSON.stringify(storedCards));
    console.log("Payment method added successfully!");
    setCardName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    navigate("/profile");
    setActiveTab("payment");
  };

  // Fetch user details from API
  const getUserDetails = async () => {
    const details = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    const userDetails = await details.json();
    setEmail(userDetails.user.email);
    setFullName(userDetails.user.shippingInformation.fullName);
    setCity(userDetails.user.shippingInformation.city);
    setStreet(userDetails.user.shippingInformation.address);
    setZipCode(userDetails.user.shippingInformation.zipCode);
    setOrders(userDetails.user.orders || []);
    setPhoneNumber(userDetails.user.phone)
    // Removed setPaymentMethods here
  };

  // Load user details on mount
  useEffect(() => {
    getUserDetails();
  }, []);

  // Use local variable for payment methods
  let paymentMethods = JSON.parse(localStorage.getItem("paymentCards")) || [];

  const updateUserDetails = async (updatedData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
      console.log(updatedData)
    }

    let responseData = await response.json();
    console.log(responseData, updatedData);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(updatedFormData);
      toast.success("Submitted Successfully");
    } catch (error) {
      toast.error("Error Updating Profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 md:pt-44">
      <ToastContainer />
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

                    <div className="mb-6">
                      <label className="block text-[#515050] mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          name="tel"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50">
                          {phoneNumber}
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex space-x-4">
                        <button
                          onClick={(e) => handleUpdateSubmit(e)}
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
                      <button
                        className="py-2 px-6 bg-[#e59a0d] text-white rounded-md"
                        onClick={() => navigate("/shop")}
                      >
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
                        onClick={() => setShowPaymentPopup(true)}
                        className="mt-4 text-white bg-[#e59a0d] px-6 py-2 rounded-xl hover:bg-[#d88a00]"
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
                              <p className="font-medium">Card</p>
                              <p className="font-sm">{method.cardName}</p>
                              <p className="text-sm text-[#515050]">
                                **** **** **** {method.cardNumber.slice(-4)}
                              </p>
                              <p className="text-sm text-[#515050]">
                                Expires: {method.expiryDate}
                              </p>
                            </div>
                            <div className="flex space-x-2">
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
                        onClick={() => setShowPaymentPopup(true)}
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
      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-center mb-4 text-[#e59a0d]">
              Add Payment Method
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full h-12 border rounded-xl px-4 outline-none placeholder:text-gray-600"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full h-12 border rounded-xl px-4 outline-none placeholder:text-gray-600"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 h-12 border rounded-xl px-4 outline-none placeholder:text-gray-600"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 h-12 border rounded-xl px-4 outline-none placeholder:text-gray-600"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <button
                className="w-full h-12 bg-[#e59a0d] text-white rounded-xl hover:bg-[#d88a00] transition"
                onClick={() => saveCardDetails()}
              >
                Save Payment Method
              </button>
            </div>

            <button
              onClick={() => setShowPaymentPopup(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
