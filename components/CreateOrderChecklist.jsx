export default function OrderChecklistForm() {
    return (
      <div className="flex h-screen  ">
        <div className=" p-8  w-3/4 ">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Create Checklist</h1>
          </div>
  
          {/* Form Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Section - Create Checklist Form */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Checklist Name*</label>
                <input
                  type="text"
                  placeholder="Enter Checklist Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                ></textarea>
              </div>
            </div>
  
            {/* Middle Section - Checklist Toggles */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium">Checklist:</label>
              <div className="mt-4">
                <div className="flex items-center mb-4">
                  <input type="checkbox" className="mr-2" />
                  <label className="text-gray-700">Checklist 1</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label className="text-gray-700">Checklist 2</label>
                </div>
              </div>
              <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md">
                + Add Checklist
              </button>
            </div>
  
            {/* Right Section - Control Status */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium">Control:</label>
              <div className="mt-4">
                <div className="flex items-center">
                  <label className="text-gray-700 mr-4">Active Status*</label>
                  <input type="checkbox" className="toggle-checkbox" checked />
                </div>
              </div>
            </div>
          </div>
  
          {/* Save Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 w-96 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  