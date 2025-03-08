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
    <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-lg flex justify-center items-center p-4">
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        
        {/* Close & Edit Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
            onClick={() => onClose(false)}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>

        {/* User Info Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-500"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
        </div>

        {/* User Details Section */}
        <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Phone:</span> {user.phone}</p>
          <p><span className="font-medium">Gender:</span> {user.gender}</p>
          <p><span className="font-medium">Date of Birth:</span> {user.dateOfBirth}</p>
          {user.about && <p><span className="font-medium">About:</span> {user.about}</p>}
        </div>

        {/* Medical Details (For Doctors) */}
        {user.role === "Doctor" && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <p className="text-lg font-semibold">Medical Information</p>
            <p><span className="font-medium">License Number:</span> {user.medicalLicenseNumber}</p>
            <p><span className="font-medium">Specialization:</span> {user.specialization}</p>
            <p><span className="font-medium">Years of Experience:</span> {user.yearsOfExperience}</p>
            {user.clinicAffiliation && user.clinicAffiliation.length > 0 && (
              <p>
                <span className="font-medium">Affiliated Clinics:</span> {user.clinicAffiliation.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Address (If Available) */}
        {user.clinicalAddress && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <p className="text-lg font-semibold">Clinical Address</p>
            <p><span className="font-medium">Address:</span> {user.clinicalAddress.address}</p>
            <p><span className="font-medium">City:</span> {user.clinicalAddress.city}</p>
            <p><span className="font-medium">State:</span> {user.clinicalAddress.state}</p>
            <p><span className="font-medium">Country:</span> {user.clinicalAddress.country}</p>
            <p><span className="font-medium">Zip Code:</span> {user.clinicalAddress.zipCode}</p>
          </div>
        )}

        {/* Last Seen & Created At */}
        <div className="mt-6 border-t pt-4 text-gray-500 dark:text-gray-400 text-sm">
          <p><span className="font-medium">Last Seen:</span> {user.lastSeen ? new Date(user.lastSeen).toLocaleString() : "N/A"}</p>
          <p><span className="font-medium">Account Created:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
