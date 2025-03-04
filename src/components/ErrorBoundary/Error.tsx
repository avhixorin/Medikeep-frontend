import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Error: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <div className="py-10 w-full min-h-[100dvh] flex justify-center items-center">
      <div className="text-center">
        <p className="text-8xl font-bold text-red-500 dark:text-red-700">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black dark:text-gray-200 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
           
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-black dark:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          
          <Link to={'/'}>
          <button
            type="button"
            className="rounded-md bg-black dark:bg-gray-200 px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-black/80 dark:hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Contact us
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error