import React from 'react';

interface Props {
  name: string;
  imgSrc: string;
}

const ChatCard: React.FC<Props> = ({ name, imgSrc }) => {
  return (
    <div className='w-full flex py-3 px-4 gap-4 items-center justify-around bg-white hover:bg-gray-100 transition-colors duration-300 border-b border-gray-300 cursor-pointer'>

      <img src={imgSrc} alt="User Avatar" className='w-10 h-10 rounded-full shadow-lg' />
      
      <div className='flex flex-col flex-grow'>
        <p className='font-semibold text-base text-gray-800'>{name}</p>
        <p className='text-sm text-gray-500'>12:23 PM</p>
      </div>
      
      <div className='flex items-center justify-center mr-4'>
        <span className='w-2.5 h-2.5 rounded-full bg-green-500' />
      </div>
    </div>
  );
}

export default ChatCard;
