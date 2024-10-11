export default function EditOrderChecklist({ condition, onClose }) {
    return (
      <div className="flex h-screen">
        <div className="p-8 w-3/4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Edit Checklist</h1>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
          </div>
  
          {/* Form Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Section - Checklist Form */}
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Checklist Name*</label>
                <input
                  type="text"
                  value={condition?.checklist_name || ''} // Pre-fill with checklist name
                  placeholder="Enter Checklist Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  value={condition?.description || ''} // Pre-fill with description
                  placeholder="Enter Description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                ></textarea>
              </div>
            </div>
  
            {/* Middle Section - Checklist Toggles */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium">Checklist QTY</label>
              <input
                type="number"
                value={condition?.checklist_qty || ''} // Pre-fill with checklist quantity
                placeholder="Enter Checklist QTY"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
  
            {/* Right Section - Control Status */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium">Control:</label>
              <div className="mt-4">
                <div className="flex items-center">
                  <label className="text-gray-700 mr-4">Active Status*</label>
                  <input
                    type="checkbox"
                    checked={condition?.active_status || false} // Pre-fill with active status
                    className="toggle-checkbox"
                  />
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
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
  