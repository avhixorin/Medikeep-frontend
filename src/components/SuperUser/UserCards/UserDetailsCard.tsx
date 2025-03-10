import { Input } from "@/components/ui/input";
import { User } from "@/types/types";
import { Pencil, X, Check } from "lucide-react";
import { useState } from "react";

const UserDetails = ({
  user,
  onClose,
}: {
  user: Partial<User>;
  onClose: (state: boolean) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>(user);

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here, you would send the `editedUser` data to the backend (API call)
    console.log("Updated User Data:", editedUser);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex justify-center items-center p-8">
      <div className="w-full max-w-5xl h-full max-h-[90vh] overflow-y-auto p-8 rounded-xl bg-white/10 dark:bg-black/20 shadow-xl border border-white/20 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-white/20">
          <h1 className="text-3xl font-semibold text-white dark:text-gray-300">
            User Profile
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-red-500 transition-all text-white hover:bg-red-600">
              Delete
            </button>
            <button
              className="p-2 rounded-lg text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-all"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Check className="w-5 h-5" onClick={handleSave} /> : <Pencil className="w-5 h-5" />}
            </button>
            <button
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-500/20 transition-all"
              onClick={() => onClose(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* User Avatar & Details */}
        <div className="flex items-center gap-6 py-6">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border border-gray-400 shadow-lg"
          />
          <div>
            {isEditing ? (
              <>
                <Input
                  value={editedUser.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="text-2xl font-bold text-white"
                />
                <Input
                  value={editedUser.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="text-2xl font-bold text-white mt-2"
                />
                <Input
                  value={editedUser.username || ""}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="text-gray-300 text-lg mt-2"
                />
                <Input
                  value={editedUser.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="text-gray-400 mt-2"
                />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-300 text-lg">@{user.username}</p>
                <p className="text-gray-400">{user.email}</p>
              </>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-white/20">
          <div>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">Phone:</span> {user.phone}
            </p>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">Gender:</span> {user.gender}
            </p>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">Date of Birth:</span> {user.dateOfBirth}
            </p>
          </div>
          {user.about && (
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">About:</span> {user.about}
            </p>
          )}
        </div>

        {/* Doctor-Specific Information */}
        {user.role === "Doctor" && (
          <div className="py-6 border-t border-white/20">
            <h2 className="text-xl font-semibold text-white">Medical Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <p className="text-lg text-white">
                <span className="font-medium text-gray-300">License Number:</span> {user.medicalLicenseNumber}
              </p>
              <p className="text-lg text-white">
                <span className="font-medium text-gray-300">Specialization:</span> {user.specialization}
              </p>
              <p className="text-lg text-white">
                <span className="font-medium text-gray-300">Years of Experience:</span> {user.yearsOfExperience}
              </p>
              {user.clinicAffiliation?.length ? (
                <p className="text-lg text-white">
                  <span className="font-medium text-gray-300">Affiliated Clinics:</span> {user.clinicAffiliation.join(", ")}
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* Clinical Address */}
        {user.clinicalAddress && (
          <div className="py-6 border-t border-white/20">
            <h2 className="text-xl font-semibold text-white">Clinical Address</h2>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">Address:</span> {user.clinicalAddress.address}
            </p>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">City:</span> {user.clinicalAddress.city}
            </p>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">State:</span> {user.clinicalAddress.state}
            </p>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">Country:</span> {user.clinicalAddress.country}
            </p>
            <p className="text-lg text-white">
              <span className="font-medium text-gray-300">Zip Code:</span> {user.clinicalAddress.zipCode}
            </p>
          </div>
        )}

        {/* Account Details */}
        <div className="py-6 border-t border-white/20 text-gray-300 text-sm">
          <p><span className="font-medium">Last Seen:</span> {user.lastSeen ? new Date(user.lastSeen).toLocaleString() : "N/A"}</p>
          <p><span className="font-medium">Account Created:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
