import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const RightSideBar:React.FC = () => {
  return (
    <ScrollArea className='w-full h-full bg-purple-400 text-white text-xl pointer-events-auto'>
      <div className='h-[200vh]'>
        RightSideBar
      </div>
    </ScrollArea>
  )
}

export default RightSideBar
