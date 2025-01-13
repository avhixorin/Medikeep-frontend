import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserData {
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  status: string;
  friends: number;
  gender: string;
}

const SharingProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `${import.meta.env.VITE_GET_DETAILS_URL}/${username}`;
        const res = await axios.get(url);

        if (res.status === 200) {
          setUserData(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch user details");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An unexpected error occurred");
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
        <img
          src={userData.avatar}
          alt={`${userData.firstName}'s Avatar`}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          {userData.firstName} {userData.lastName}
        </h1>
        <p className="text-sm text-gray-600">{userData.username}</p>
        <p className="mt-2 text-gray-700">{userData.email}</p>

        {userData.status === "Public" && (
          <div className="mt-4 text-left space-y-2">
            <p className="text-sm text-gray-600">Friends: {userData.friends}</p>
            <p className="text-sm text-gray-600">Gender: {userData.gender}</p>
            <p className="text-sm text-gray-600">Status: {userData.status}</p>
          </div>
        )}

        <button
          onClick={() =>
            window.open("https://medikeep.avhixorin.me/login", "_blank")
          }
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 transform transition duration-300 hover:scale-105"
        >
          Connect with {userData.firstName}
        </button>
      </div>
    </div>
  );
};

export default SharingProfile;
