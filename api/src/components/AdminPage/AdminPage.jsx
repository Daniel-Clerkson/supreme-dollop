import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUserShield, FaTrashAlt, FaUserPlus, FaBoxOpen, FaCalendarTimes, FaSchool, FaChartLine, FaUsers, FaShoppingCart, FaSpinner } from 'react-icons/fa';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [schools, setSchools] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Configuration - Update these with your actual API endpoints
  const API_BASE_URL = 'https://your-api-url.com/api';
  const API_ENDPOINTS = {
    users: `${API_BASE_URL}/users`,
    orders: `${API_BASE_URL}/orders`,
    bookings: `${API_BASE_URL}/bookings`,
    schools: `${API_BASE_URL}/schools`,
    revenue: `${API_BASE_URL}/revenue`,
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all data in parallel
      const [usersRes, ordersRes, bookingsRes, schoolsRes, revenueRes] = await Promise.all([
        fetch(API_ENDPOINTS.users, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your auth token
            'Content-Type': 'application/json',
          },
        }),
        fetch(API_ENDPOINTS.orders, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(API_ENDPOINTS.bookings, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(API_ENDPOINTS.schools, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(API_ENDPOINTS.revenue, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      // Check if all requests were successful
      if (!usersRes.ok || !ordersRes.ok || !bookingsRes.ok || !schoolsRes.ok || !revenueRes.ok) {
        throw new Error('Failed to fetch data from API');
      }

      // Parse JSON responses
      const [usersData, ordersData, bookingsData, schoolsData, revenueDataRes] = await Promise.all([
        usersRes.json(),
        ordersRes.json(),
        bookingsRes.json(),
        schoolsRes.json(),
        revenueRes.json(),
      ]);

      // Update state with fetched data
      setUsers(usersData);
      setOrders(ordersData);
      setBookings(bookingsData);
      setSchools(schoolsData);
      setRevenueData(revenueDataRes);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      
      // Use demo data as fallback
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  // Demo data fallback
  const loadDemoData = () => {
    setUsers([
      { id: 1, name: 'Daniel Clarkson', email: 'meckydurhix@gmail.com', isAdmin: false },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', isAdmin: true },
    ]);
    setOrders([
      { id: 101, customer: 'Daniel Clarkson', item: 'Wedding Catering', status: 'Confirmed' },
      { id: 102, customer: 'Jane Doe', item: 'Birthday Party', status: 'Pending' },
      { id: 103, customer: 'John Smith', item: 'Corporate Lunch', status: 'Confirmed' },
    ]);
    setBookings([
      { id: 201, name: 'Daniel Clarkson', date: '2025-11-10', type: 'Corporate Event' },
      { id: 202, name: 'Sarah Johnson', date: '2025-11-15', type: 'Wedding' },
    ]);
    setSchools([
      { id: 301, name: 'Lagos International School', contact: 'admin@lis.ng', students: 450, plan: 'Premium' },
      { id: 302, name: 'Rainbow Academy', contact: 'info@rainbow.edu', students: 280, plan: 'Standard' },
      { id: 303, name: 'Victoria High School', contact: 'contact@victoria.ng', students: 620, plan: 'Premium' },
    ]);
    setRevenueData([
      { month: 'Jan', revenue: 12000 },
      { month: 'Feb', revenue: 15000 },
      { month: 'Mar', revenue: 18000 },
      { month: 'Apr', revenue: 22000 },
      { month: 'May', revenue: 19000 },
      { month: 'Jun', revenue: 25000 },
    ]);
  };

  // API call functions
  const makeAdmin = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.users}/${id}/make-admin`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to update user');

      setUsers(users.map(user => user.id === id ? { ...user, isAdmin: true } : user));
    } catch (err) {
      console.error('Error making admin:', err);
      alert('Failed to update user. Please try again.');
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.users}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const cancelOrder = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.orders}/${id}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to cancel order');

      setOrders(orders.map(order => order.id === id ? { ...order, status: 'Cancelled' } : order));
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.bookings}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to cancel booking');

      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const deleteSchool = async (id) => {
    if (!confirm('Are you sure you want to remove this school?')) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.schools}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete school');

      setSchools(schools.filter(school => school.id !== id));
    } catch (err) {
      console.error('Error deleting school:', err);
      alert('Failed to remove school. Please try again.');
    }
  };

  // Calculate chart data
  const orderStatusData = [
    { name: 'Confirmed', value: orders.filter(o => o.status === 'Confirmed').length },
    { name: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${bgColor} p-4 rounded-lg`}>
          <Icon className={`text-2xl ${color}`} />
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-5xl text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">Monitor and manage your catering business</p>
          </div>
          <button
            onClick={fetchAllData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaSpinner className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6">
            <p className="text-sm">⚠️ API Error: {error}. Showing demo data.</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={FaUsers} 
            title="Total Users" 
            value={users.length} 
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard 
            icon={FaShoppingCart} 
            title="Active Orders" 
            value={orders.filter(o => o.status !== 'Cancelled').length} 
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard 
            icon={FaCalendarTimes} 
            title="Bookings" 
            value={bookings.length} 
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <StatCard 
            icon={FaSchool} 
            title="Schools" 
            value={schools.length} 
            color="text-amber-600"
            bgColor="bg-amber-50"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-xl text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Revenue Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaBoxOpen className="text-xl text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Order Status</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
              <FaUserShield className="text-2xl text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700">Name</th>
                    <th className="p-4 font-semibold text-gray-700">Email</th>
                    <th className="p-4 font-semibold text-gray-700">Role</th>
                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{user.name}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 flex-wrap">
                          {!user.isAdmin && (
                            <button
                              onClick={() => makeAdmin(user.id)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <FaUserPlus /> <span className="text-xs">Admin</span>
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <FaTrashAlt /> <span className="text-xs">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 p-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <FaBoxOpen className="text-2xl text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700">Customer</th>
                    <th className="p-4 font-semibold text-gray-700">Item</th>
                    <th className="p-4 font-semibold text-gray-700">Status</th>
                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{order.customer}</td>
                      <td className="p-4 text-gray-600">{order.item}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={order.status === 'Cancelled'}
                        >
                          <FaTrashAlt /> <span className="text-xs">Cancel</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <FaCalendarTimes className="text-2xl text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700">Name</th>
                    <th className="p-4 font-semibold text-gray-700">Date</th>
                    <th className="p-4 font-semibold text-gray-700">Type</th>
                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{booking.name}</td>
                      <td className="p-4 text-gray-600">{booking.date}</td>
                      <td className="p-4 text-gray-600">{booking.type}</td>
                      <td className="p-4">
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                        >
                          <FaTrashAlt /> <span className="text-xs">Cancel</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Schools Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 p-6 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
              <FaSchool className="text-2xl text-amber-600" />
              <h2 className="text-xl font-semibold text-gray-800">Schools</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700">School Name</th>
                    <th className="p-4 font-semibold text-gray-700">Students</th>
                    <th className="p-4 font-semibold text-gray-700">Plan</th>
                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map(school => (
                    <tr key={school.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-gray-800">{school.name}</div>
                          <div className="text-xs text-gray-500">{school.contact}</div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{school.students}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          school.plan === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {school.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteSchool(school.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                        >
                          <FaTrashAlt /> <span className="text-xs">Remove</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}