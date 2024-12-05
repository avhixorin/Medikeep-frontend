import { RootState } from '@/redux/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

type ManageConnectionsProps = {
  setIsManagingConnections: (value: boolean) => void;
};

const ManageConnections: React.FC<ManageConnectionsProps> = ({
  setIsManagingConnections,
}) => {
  const connectionRequests = useSelector(
    (state: RootState) => state.auth.user?.connectionRequests
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="relative rounded-lg bg-white dark:bg-[#1e293b] shadow-md p-6 max-w-lg w-[90%]">
        {/* Close Button */}
        <button
          onClick={() => setIsManagingConnections(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Manage Connection Requests
        </h2>

        {connectionRequests && connectionRequests.length > 0 ? (
          <ul className="space-y-3 max-h-[300px] overflow-y-auto">
            {connectionRequests.map((request) => (
              <li
                key={request._id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
              >
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    {request.username}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {request.email}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No connection requests at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageConnections;
