import { User } from "@/types/types";
import { Pencil, X } from "lucide-react";

const UserDetails = ({
  user,
  onClose,
}: {
  user: Partial<User>;
  onClose: (state: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex justify-center items-center p-8">
      <div className="w-full max-w-5xl h-full max-h-[90vh] overflow-y-auto p-8 rounded-xl bg-white/10 dark:bg-black/20 shadow-xl border border-white/20 flex flex-col">
        
        <div className="flex justify-between items-center pb-6 border-b border-white/20">
          <h1 className="text-3xl font-semibold text-white dark:text-gray-300">
            User Profile
          </h1>
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-500/20 transition-all"
              onClick={() => onClose(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 py-6">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border border-gray-400 shadow-lg"
          />
          <div>
            <p className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</p>
            <p className="text-gray-300 text-lg">@{user.username}</p>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

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
              {(user.clinicAffiliation?.length ?? 0) > 0 && (
                <p className="text-lg text-white">
                  <span className="font-medium text-gray-300">Affiliated Clinics:</span> {user.clinicAffiliation?.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

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

        <div className="py-6 border-t border-white/20 text-gray-300 text-sm">
          <p><span className="font-medium">Last Seen:</span> {user.lastSeen ? new Date(user.lastSeen).toLocaleString() : "N/A"}</p>
          <p><span className="font-medium">Account Created:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
