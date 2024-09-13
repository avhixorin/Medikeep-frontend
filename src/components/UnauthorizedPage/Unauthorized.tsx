import React from 'react' 
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <div className="py-10 w-full min-h-[100dvh] flex justify-center items-center bg-white-100">
      <div className="text-center">
        <p className="text-4xl font-semibold text-black">401</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Unauthorized Access
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, you&apos;re not authorized to access this page.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
           
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          
          <Link to={'/sign-in'}>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Login
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Unauthorized