import React, { useEffect, useState } from "react";

const EdituserForm = ({ userId }) => {
  // State to hold user data
  const [userData, setUserData] = useState({
    userId: '',
    joiningDate: '',
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    userRole: '',
    department: '',
    branch: '',
    pincode: '',
    country: '',
    state: '',
    city: '',
    landmark: '',
    street: '',
    emailId: '',
    phoneNumber: '',
    teamHeader: '',
    activeStatus: false,
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch(`api/users/${userId}`);
        const data = await response.json();

        // Set user data to state
        setUserData({
          userId: data.userId || '',
          joiningDate: data.joiningDate || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          loginId: data.loginId || '',
          password: data.password || '',
          userRole: data.userRole || '',
          department: data.department || '',
          branch: data.branch || '',
          pincode: data.pincode || '',
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
          landmark: data.landmark || '',
          street: data.street || '',
          emailId: data.emailId || '',
          phoneNumber: data.phoneNumber || '',
          teamHeader: data.teamHeader || '',
          activeStatus: data.activeStatus || false,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here
    console.log("Updated user data:", userData);
  };

  return (
    <div className="flex flex-col items-left justify-left min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-5xl">
        {/* Form Title */}
        <h2 className="text-2xl font-bold mb-6">Edit User</h2>
        
        {/* Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Personal Details (Left Section) */}
          <div className="md:col-span-4">
            <h3 className="font-semibold mb-2">Personal Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                User ID
                <input
                  type="text"
                  name="userId"
                  value={userData.userId}
                  readOnly
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Joining Date
                <input
                  type="date"
                  name="joiningDate"
                  value={userData.joiningDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Login ID
                <input
                  type="text"
                  name="loginId"
                  value={userData.loginId}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                User Role
                <select
                  name="userRole"
                  value={userData.userRole}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select User Role</option>
                  {/* Add role options here */}
                </select>
              </label>
              <label>
                Department
                <select
                  name="department"
                  value={userData.department}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select Department</option>
                  {/* Add department options here */}
                </select>
              </label>
              <label className="col-span-2">
                Branch
                <input
                  type="text"
                  name="branch"
                  value={userData.branch}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
            </div>
          </div>

          {/* Address (Center Section) */}
          <div className="md:col-span-5">
            <h3 className="font-semibold mb-2">Address:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                Pincode
                <input
                  type="text"
                  name="pincode"
                  value={userData.pincode}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Country
                <select
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select Country</option>
                  {/* Add country options here */}
                </select>
              </label>
              <label>
                State
                <select
                  name="state"
                  value={userData.state}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select State</option>
                  {/* Add state options here */}
                </select>
              </label>
              <label>
                City
                <select
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select City</option>
                  {/* Add city options here */}
                </select>
              </label>
              <label>
                Landmark
                <input
                  type="text"
                  name="landmark"
                  value={userData.landmark}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Street
                <input
                  type="text"
                  name="street"
                  value={userData.street}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Email ID
                <input
                  type="email"
                  name="emailId"
                  value={userData.emailId}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label className="col-span-2">
                Team Header
                <input
                  type="text"
                  name="teamHeader"
                  value={userData.teamHeader}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
              </label>
            </div>
          </div>

          {/* Control (Right Section) */}
          <div className="md:col-span-3">
            <h3 className="font-semibold mb-2">Control:</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="activeStatus"
                  checked={userData.activeStatus}
                  onChange={handleChange}
                  className="mr-2"
                />
                Active Status
              </label>
              
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]"
            onClick={handleSubmit} // Ensure to call the handleSubmit function on button click
          >
           Update
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default EdituserForm;
