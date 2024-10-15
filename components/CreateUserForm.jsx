import React from "react";

const UserForm = () => {
  return (

    <div className="flex flex-col items-left justify-left min-h-screen bg-gray-100">

      <form className="bg-white p-6 rounded-md shadow-md w-full max-w-5xl">
        {/* Form Title */}

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
                  placeholder="User ID"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Joining Date
                <input
                  type="date"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                First Name
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Login ID
                <input
                  type="text"
                  placeholder="Login ID"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                User Role
                <select className="w-full border p-2 rounded-md">
                  <option>Select User Role</option>
                </select>
              </label>
              <label>
                Department
                <select className="w-full border p-2 rounded-md">
                  <option>Select Department</option>
                </select>
              </label>
              <label className="col-span-2">
                Branch
                <input
                  type="text"
                  placeholder="Branch"
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
                  placeholder="Pincode"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Country
                <select className="w-full border p-2 rounded-md">
                  <option>Select Country</option>
                </select>
              </label>
              <label>
                State
                <select className="w-full border p-2 rounded-md">
                  <option>Select State</option>
                </select>
              </label>
              <label>
                City
                <select className="w-full border p-2 rounded-md">
                  <option>Select City</option>
                </select>
              </label>
              <label>
                Landmark
                <input
                  type="text"
                  placeholder="Landmark"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Street
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Email ID
                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label>
                Phone Number
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border p-2 rounded-md"
                />
              </label>
              <label className="col-span-2">
                Team Header
                <input
                  type="text"
                  placeholder="Team Header"
                  className="w-full border p-2 rounded-md"
                />
              </label>
            </div>
          </div>

          {/* Control (Right Section) */}
          <div className="md:col-span-3">
            <h3 className="font-semibold mb-2">Control:</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <span>Active Status</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-96"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
