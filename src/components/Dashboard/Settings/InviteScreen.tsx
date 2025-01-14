import React from 'react';
import { TeleGram, WhatsApp } from '../../../../public/SVGs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const InviteScreen: React.FC<{ onClose: (arg0: boolean) => void }> = ({ onClose }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const inviteLink = user?.settingPreferences?.sharing?.sharingLink || 'https://medikeep.avhixorin.me/login';
  const inviteMessage = `${user?.firstName} ${user?.lastName} is inviting you to join the MediKeep family! \nCheck this out: ${inviteLink}`;

  const handleShare = (platform: string) => {
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;
    } else if (platform === 'telegram') {
      url = `https://t.me/share/url?text=${encodeURIComponent(inviteMessage)}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#141414] dark:text-gray-200 text-gray-600 rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-lg font-semibold text-center mb-4">Invite Your Friends</h2>
        <p className="text-sm text-center mb-6">
          Share this invitation with your friends and family to join the MediKeep family!
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => handleShare('whatsapp')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600">
            <WhatsApp />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => handleShare('telegram')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
            <TeleGram />
            <span>Telegram</span>
          </button>
        </div>
        <button
          onClick={() => onClose(false)}
          className="block w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-center hover:bg-gray-400">
          Close
        </button>
      </div>
    </div>
  );
};

export default InviteScreen;
