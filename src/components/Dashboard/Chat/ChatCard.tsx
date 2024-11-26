import { Circle } from 'lucide-react';
import React from 'react';

interface Props {
  name: string;
  imgSrc: string;
}

const ChatCard: React.FC<Props> = ({ name, imgSrc }) => {
  return (
    <div className='w-full flex py-3 px-4 gap-4 items-center justify-around bg-white hover:bg-gray-100 dark:bg-[#1A1A1D] dark:hover:bg-[#212121] transition-colors duration-300 border-b border-gray-300 cursor-pointer'>

      <img src={imgSrc} alt="User Avatar" className='w-10 h-10 rounded-full shadow-lg' />
      
      <div className='flex flex-col flex-grow'>
        <p className='font-semibold text-base text-gray-800 dark:text-gray-400'>{name}</p>
        <p className='text-sm text-gray-500 dark:text-gray-300'>12:23 PM</p>
      </div>
      
      <div className='flex items-center justify-center mr-4'>
        <Circle size={10} color='#00A884' className='dark:fill-[#005F4E]' />
      </div>
    </div>
  );
}

export default ChatCard;
