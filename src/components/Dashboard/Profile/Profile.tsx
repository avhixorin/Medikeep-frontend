import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import Upload from "./Upload/Upload";
import { DatePicker } from "rsuite";

const Profile: React.FC = () => {
  const [uploadClicked, setUploadClicked] = useState(false);
  const cancelUpload = () => {
    setUploadClicked(false);
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    clinicAffiliation: user?.clinicAffiliation || [], // Initialize as an array
    consultationHours: user?.consultationHours || [], // Initialize as an array
    gender: user?.gender || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === "clinicAffiliation") {
      const updatedAffiliations = [...editableData.clinicAffiliation];
      updatedAffiliations[index!] = value; // Update specific index in the array
      setEditableData({ ...editableData, clinicAffiliation: updatedAffiliations });
    } else if (name === "consultationHours") {
      const updatedHours = [...editableData.consultationHours];
      updatedHours[index!] = { ...updatedHours[index!], [e.target.dataset.type as string]: value };
      setEditableData({ ...editableData, consultationHours: updatedHours });
    } else {
      setEditableData({ ...editableData, [name]: value });
    }
  };

  const handleAddAffiliation = () => {
    setEditableData((prev) => ({
      ...prev,
      clinicAffiliation: [...prev.clinicAffiliation, ""], // Add a new affiliation input
    }));
  };

  const handleAddConsultationHour = () => {
    setEditableData((prev) => ({
      ...prev,
      consultationHours: [...prev.consultationHours, { start: "", end: "" }], // Add new consultation hour
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const removeLastConsultationInterval = () => {
    setEditableData((prev) => ({
      ...prev,
      consultationHours: prev.consultationHours.slice(0, -1),
    }));
  };
  
  const handleConsultationTimeChange = (index: number, type: 'start' | 'end', date: Date | null) => {
    const updatedHours = [...editableData.consultationHours];
    updatedHours[index] = { ...updatedHours[index], [type]: date };
    setEditableData({ ...editableData, consultationHours: updatedHours });
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave(); // Call handleSave when saving
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* For uploading user profile picture */}
      <div className={`w-full h-full relative ${uploadClicked ? "block" : "hidden"}`}>
        <Upload cancelUpload={cancelUpload} setUploadClicked={setUploadClicked} />
      </div>

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
          className="w-32 h-32 rounded-full object-cover cursor-pointer"
          onClick={() => setUploadClicked(true)}
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

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-gray-700">Affiliations</label>
          {editableData.clinicAffiliation.map((affiliation, index) => (
            <input
              key={index}
              type="text"
              name="clinicAffiliation"
              value={affiliation}
              onChange={(e) => handleInputChange(e, index)}
              disabled={!isEditing}
              className="border w-full p-2 rounded focus:outline-none focus:ring mb-2"
            />
          ))}
          {isEditing && (
            <button
              onClick={handleAddAffiliation}
              className="text-blue-500 hover:underline"
            >
              Add Affiliation
            </button>
          )}
        </div>

        <div>
        <label htmlFor="consultationHours" className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Hours
              </label>
              {editableData.consultationHours.map((time, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <DatePicker
                    format="hh:mm"
                    placeholder="Start Time"
                    placement='topEnd'
                    onChange={(date) => handleConsultationTimeChange(index, 'start', date)}
                    value={time.start ? new Date(time.start) : null}
                    className="w-1/2 rounded-lg py-2 px-3 text-gray-900"
                  />
                  <DatePicker
                    format="hh:mm"
                    placeholder="End Time"
                    placement='topEnd'
                    onChange={(date) => handleConsultationTimeChange(index, 'end', date)}
                    value={time.end ? new Date(time.end) : null}
                    className="w-1/2 rounded-lg py-2 px-3 text-gray-900"
                  />
                </div>
              ))}
              <div className='w-full flex justify-between space-x-4'>
                <button
                  type="button"
                  onClick={handleAddConsultationHour}
                  className='bg-blue-500 w-1/2 text-white py-2 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm'
                  // Uncomment the following line if you want to disable the button when the max number of intervals is reached
                  // disabled={consultationTimes.length >= 3}
                >
                  + Add Interval
                </button>
                {editableData.consultationHours.length > 1 && (
                  <button
                    type="button"
                    onClick={removeLastConsultationInterval}
                    className='bg-red-500 w-1/2 text-white py-2 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs md:text-sm'
                  >
                    - Remove Interval
                  </button>
                )}
              </div>
        </div>

        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={editableData.dateOfBirth.split("T")[0]} // Format for date input
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border w-full p-2 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            value={editableData.gender}
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
