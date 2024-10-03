import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    height: "180 cm", // Placeholder values for additional info
    weight: "75 kg",
    waist: "32 inches",
    chest: "40 inches",
    bmi: "23.1",
    bloodSugar: "90 mg/dL",
    heartRate: "72 bpm",
    bloodPressure: "120/80 mmHg",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <button
          onClick={toggleEdit}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex gap-6 mb-8">
        <img
          src={user?.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editableData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border w-full p-2 rounded focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editableData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border w-full p-2 rounded focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={editableData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border w-full p-2 rounded focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-gray-700">Medical License</label>
              <input
                type="text"
                value={user?.medicalLicenseNumber}
                disabled
                className="border w-full p-2 rounded focus:outline-none focus:ring bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700">Specialization</label>
              <input
                type="text"
                value={user?.specialization}
                disabled
                className="border w-full p-2 rounded focus:outline-none focus:ring bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700">Years of Experience</label>
              <input
                type="text"
                value={user?.yearsOfExperience}
                disabled
                className="border w-full p-2 rounded focus:outline-none focus:ring bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Height</label>
          <input
            type="text"
            name="height"
            value={editableData.height}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Weight</label>
          <input
            type="text"
            name="weight"
            value={editableData.weight}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Waist</label>
          <input
            type="text"
            name="waist"
            value={editableData.waist}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Chest</label>
          <input
            type="text"
            name="chest"
            value={editableData.chest}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">BMI</label>
          <input
            type="text"
            name="bmi"
            value={editableData.bmi}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Blood Sugar</label>
          <input
            type="text"
            name="bloodSugar"
            value={editableData.bloodSugar}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Heart Rate</label>
          <input
            type="text"
            name="heartRate"
            value={editableData.heartRate}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Blood Pressure</label>
          <input
            type="text"
            name="bloodPressure"
            value={editableData.bloodPressure}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
