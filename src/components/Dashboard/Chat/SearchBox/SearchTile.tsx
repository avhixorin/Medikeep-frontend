import React from "react";

type SearchTileProps = {
  profileImage: string;
  username: string;
  role: string;
  onConnect: () => void;
};

const SearchTile: React.FC<SearchTileProps> = ({ profileImage, username, role, onConnect }) => {
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-md space-x-4 hover:shadow-lg transition-shadow">

      <img
        src={profileImage}
        alt={`${username}'s profile`}
        className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-700"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{username}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>

      <button
        onClick={onConnect}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 transition-all"
      >
        Connect
      </button>
    </div>
  );
};

export default SearchTile;
