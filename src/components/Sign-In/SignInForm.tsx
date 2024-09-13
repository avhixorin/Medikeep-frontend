import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignInForm.css';
import Swal from 'sweetalert2';
import BackButton from "../Back-Button/BackButton";
import { useDispatch } from 'react-redux';
import { setAuthUser } from "../Redux/features/authSlice";


interface loginFormData {
  email: string;
  password: string;
}

const TnC: React.FC = () => {
  return (
    <div className="tnc-container flex justify-start items-center">
      <p className="text-zinc-500 dark:text-zinc-400">
        By logging in, you accept our
        <Link className="text-blue-500 hover:text-blue-800 ml-2" to={'/tnc'}>terms and conditions</Link>
      </p>
    </div>
  );
};

const SignInForm: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<loginFormData>({
    email: '',
    password: ''
  });
  // const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://medikeep-backend.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log in');
      }

      const data = await response.json();
      if (data?.statusCode === 200) {
        await Swal.fire({
          text:data.message,
          icon:"success"
        })
        
        // console.log(data.data)
        dispatch(setAuthUser(data.data));
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // setError(error.message);
      } else {
        // setError('An unknown error occurred');
      }
      // setError(error.message);
    }
  };

  return (
    <>
      <div className="grid-cols-1 grid lg:grid-cols-2 min-h-[100dvh] bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200">
        <div className="flex items-center justify-center col-span-1 lg:p-8">
          <div className="lform-container w-[75%] flex justify-center items-center">
            <div className="w-full">
            <div className="w-full mb-9 relative flex items-center justify-center">
              <div className="absolute left-0">
                <BackButton text={""} thickness={20} />
              </div>
            <p className="sititle text-center w-full">Welcome back</p>
            </div>


              {/* {error && <div className="error-message">{error}</div>} */}
              
              <form onSubmit={handleSubmit} className="form flex flex-col gap-4">
                <input 
                  type="email" 
                  name="email"
                  className="sinput" 
                  placeholder="Email" 
                  onChange={handleInputChange}
                  value={loginFormData.email}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="sinput"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={loginFormData.password}
                  required
                />
                <p className="page-link">
                  <span className="page-link-label">Forgot Password?</span>
                </p>
                <div className="input-group md:col-span-2">
                  <TnC />
                </div>
                <div className="input-group md:col-span-2">
                  <button className='form-btn'>Log in</button>
                </div>
              </form>
              
              <p className="sign-up-label">
                Don't have an account?
                <Link to={"/sign-up"} className="sign-up-link">
                  Sign up
                </Link>
              </p>
              <div className="buttons-container mt-3">
                <div className="google-login-button">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    className="google-icon"
                    viewBox="0 0 48 48"
                    height="1.1em"
                    width="1.1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span>Log in with Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden lg:block w-full h-full"
        >
          <img
            className="h-[70%] w-[70%] object-contain my-20 mx-auto"
            draggable={false}
            src="https://res.cloudinary.com/avhixorin/image/upload/v1724779943/Account3DAnimatedIcon-ezgif.com-crop_1_xivavn.gif"
            alt="gif"
          />
        </div>
      </div>
    </>
  );
};

export default SignInForm;
