import React from 'react';

function Profile() {
  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>

          {/* User Details */}
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">johndoe@example.com</p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Full Name:</span>
            <span className="text-gray-800">John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800">johndoe@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Role:</span>
            <span className="text-gray-800">Admin</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
