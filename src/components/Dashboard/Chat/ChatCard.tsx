import { setSelectedUser } from '@/redux/features/selectedUserSlice';
import { RootState } from '@/redux/store/store';
import { User } from '@/types/types';
import { Circle } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pulse from './Pulse';

interface Props {
  user: User;
  isActive?: boolean;
}

const ChatCard: React.FC<Props> = ({ user, isActive }) => {
  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const dispatch = useDispatch();

  return (
    <div className={`w-full flex py-3 px-4 gap-4 items-center justify-around hover:bg-gray-100  dark:hover:bg-[#212121] transition-colors duration-300 border-b  cursor-pointer ${selectedUser?._id === user._id ? 'bg-red-100 dark:bg-[#212121] border-gray-400 hover:bg-red-200' : 'bg-white dark:bg-[#1A1A1D] border-gray-300'}`}
    onClick={() => dispatch(setSelectedUser(user))}
    >

      <img src={user.profilePicture || "https://randomuser.me/api/portraits"} alt="User Avatar" className='w-10 h-10 rounded-full shadow-lg' />
      
      <div className='flex flex-col flex-grow'>
        <p className='font-semibold text-base text-gray-800 dark:text-gray-400'>{user.username}</p>
        <p className='text-sm text-gray-500 dark:text-gray-300'>12:23 PM</p>
      </div>
      
      <div className='flex items-center justify-center mr-4'>
        {
          isActive ? (
            <Pulse size='2' />
          ) : (
            <Circle size={10} color='#00A884' className={`dark:fill-[#005F4E]`} />
          )
        }
      </div>
    </div>
  );
}

export default ChatCard;
