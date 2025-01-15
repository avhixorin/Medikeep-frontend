import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useUpdate from '@/hooks/useUpdate';
import toast from 'react-hot-toast';

const UpdatePasswordScreen: React.FC<{ onClose: (arg0: boolean) => void }> = ({ onClose }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const url = import.meta.env.VITE_UPDATE_PASSWORD_URL;
  const { updatePassword } = useUpdate(url);

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (user?._id) {
      try {
        await updatePassword(user._id, oldPassword, newPassword);
        onClose(false);
      } catch (error) {
        toast.error('Failed to update password');
        console.error('Error updating password:', error);
      }
    } else {
      toast.error('User ID is not available');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-600 rounded-lg p-6 shadow-lg w-96">
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-center mb-4">Change Password</h2>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter the Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter the New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm the New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="mt-4 w-full"
          onClick={handlePasswordUpdate}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default UpdatePasswordScreen;
