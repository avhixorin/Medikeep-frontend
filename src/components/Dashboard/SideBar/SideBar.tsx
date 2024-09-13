import React from 'react';
import { useNavigate} from 'react-router-dom';
// import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Calendar, User, HeartPulse, FileText, MessageCircle, LogOut } from 'lucide-react';
import { clearAuthUser } from '../../Redux/features/authSlice';
import { useSelector, useDispatch } from "react-redux";

import Swal from 'sweetalert2';
const SideBar: React.FC = () => {
  interface User {
    profilePicture: string;
    // Add other properties of the user object here
  }

  const user = useSelector((state: { auth: { user: User } }) => state.auth.user);
  
  


  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('https://medikeep-backend.onrender.com/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
     
        const data = await response.json();
  
        if (data?.success) {
          await Swal.fire({
            text:data.message,
            icon:"success"
          })
          dispatch(clearAuthUser());
          navigate('/sign-in');
        } else {
          await Swal.fire({
            text:data.message || 'Logout failed',
            icon:"error"
          })
        }
      
    } catch (error) {
      await Swal.fire({
        text:"An error occurred during logout",
        icon:"error"
      })
      console.log(error)
      
    }
  };
  
  return (
    <aside className="flex justify-between items-center min-h-[100dvh] w-18 md:w-24 flex-col overflow-y-auto bg-[#E8E7E7] rounded-ss-3xl rounded-es-3xl">
      <section className="w-16 h-[26.625rem] flex flex-col justify-evenly items-center">
        <div className="flex justify-center items-center">
          
            <img
            className="h-14 w-14 md:h-20 md:w-20 rounded-full object-cover cursor-pointer"
            src={user?.profilePicture || "https://res.cloudinary.com/avhixorin/image/upload/v1724570240/profile-default_uo3gzg.png"}
            alt="User avatar"
            onClick={() => navigate('/dashboard/profile')}
          />
        </div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 13.25H10.75V0.75H0.75V13.25ZM0.75 23.25H10.75V15.75H0.75V23.25ZM13.25 23.25H23.25V10.75H13.25V23.25ZM13.25 0.75V8.25H23.25V0.75H13.25Z"
                fill={isActive ? "white" : "#707070"}
              />
            </svg>
          )}
        </NavLink>
        <NavLink
          to="/dashboard/appointments"
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.25 2.75H24.25C24.5815 2.75 24.8995 2.8817 25.1339 3.11612C25.3683 3.35054 25.5 3.66848 25.5 4V24C25.5 24.3315 25.3683 24.6495 25.1339 24.8839C24.8995 25.1183 24.5815 25.25 24.25 25.25H1.75C1.41848 25.25 1.10054 25.1183 0.866116 24.8839C0.631696 24.6495 0.5 24.3315 0.5 24V4C0.5 3.66848 0.631696 3.35054 0.866116 3.11612C1.10054 2.8817 1.41848 2.75 1.75 2.75H6.75V0.25H9.25V2.75H16.75V0.25H19.25V2.75ZM3 10.25V22.75H23V10.25H3ZM5.5 15.25H11.75V20.25H5.5V15.25Z"
                fill={isActive ? "white" : "#707070"}
              />
            </svg>
          )}
        </NavLink>
        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <svg
              width="22"
              height="20"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.500002 8.24251C0.499343 7.25776 0.692941 6.28256 1.06971 5.37274C1.44648 4.46292 1.99902 3.63636 2.69569 2.94039C3.39236 2.24442 4.21947 1.69271 5.12967 1.31685C6.03986 0.940989 7.01526 0.748366 8 0.75001H18C22.1413 0.75001 25.5 4.11876 25.5 8.24251V23.25H8C3.85875 23.25 0.500002 19.8813 0.500002 15.7575V8.24251ZM23 20.75V8.24251C22.9967 6.91814 22.4686 5.64906 21.5314 4.71328C20.5943 3.77751 19.3244 3.25133 18 3.25001H8C7.34356 3.24836 6.69325 3.37632 6.08637 3.62654C5.47949 3.87676 4.92798 4.24433 4.46345 4.70815C3.99893 5.17198 3.63054 5.72294 3.37941 6.32945C3.12827 6.93595 2.99934 7.58607 3 8.24251V15.7575C3.00331 17.0819 3.53139 18.351 4.46857 19.2867C5.40576 20.2225 6.67562 20.7487 8 20.75H23ZM15.5 10.75H18V13.25H15.5V10.75ZM8 10.75H10.5V13.25H8V10.75Z"
                fill={isActive ? "white" : "#707070"}
              />
            </svg>
          )}
        </NavLink>
        <NavLink
          to="/dashboard/medicalrecords"
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 25.5C6.09625 25.5 0.5 19.9037 0.5 13C0.5 7.4025 4.17875 2.665 9.25 1.0725V3.7275C7.10116 4.60006 5.32225 6.19213 4.21757 8.23139C3.1129 10.2707 2.7511 12.6304 3.19407 14.9069C3.63703 17.1835 4.85724 19.2354 6.64596 20.7117C8.43467 22.1879 10.6808 22.9968 13 23C14.9922 22.9999 16.9391 22.4051 18.5911 21.2915C20.243 20.178 21.5249 18.5967 22.2725 16.75H24.9275C23.335 21.8213 18.5975 25.5 13 25.5ZM25.4375 14.25H11.75V0.5625C12.1613 0.52125 12.5787 0.5 13 0.5C19.9037 0.5 25.5 6.09625 25.5 13C25.5 13.4213 25.4788 13.8387 25.4375 14.25ZM14.25 3.0775V11.75H22.9225C22.6443 9.54701 21.6411 7.49917 20.071 5.92904C18.5008 4.35892 16.453 3.35573 14.25 3.0775Z"
                fill={isActive ? "white" : "#707070"}
              />
            </svg>
          )}
        </NavLink>
      </section>

      <section className="w-16 h-[15rem] flex flex-col justify-evenly items-center">
        

        <NavLink
          to="/dashboard/settings/healthprofile"
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <svg
              width="20"
              height="22"
              viewBox="0 0 26 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.45341 20.6667C0.889775 19.692 0.451634 18.6499 0.149414 17.5653C0.807157 17.2308 1.35954 16.7208 1.74545 16.0919C2.13137 15.4629 2.33577 14.7394 2.33604 14.0015C2.33632 13.2636 2.13246 12.5399 1.74702 11.9107C1.36157 11.2814 0.809574 10.771 0.152081 10.436C0.754795 8.25666 1.90239 6.26661 3.48675 4.65334C4.10554 5.05564 4.82357 5.27889 5.56138 5.29838C6.2992 5.31787 7.02802 5.13285 7.66719 4.76378C8.30636 4.39472 8.83095 3.85601 9.18292 3.20726C9.53488 2.55852 9.70049 1.82504 9.66141 1.08801C11.8509 0.522171 14.1484 0.523089 16.3374 1.09067C16.2987 1.82769 16.4646 2.56106 16.8169 3.20962C17.1691 3.85818 17.6939 4.39664 18.3332 4.76542C18.9725 5.1342 19.7013 5.31892 20.4391 5.29914C21.1769 5.27936 21.8948 5.05585 22.5134 4.65334C23.2854 5.44001 23.9707 6.33468 24.5467 7.33334C25.1241 8.33201 25.5561 9.37334 25.8507 10.4347C25.193 10.7692 24.6406 11.2792 24.2547 11.9081C23.8688 12.5371 23.6644 13.2606 23.6641 13.9985C23.6638 14.7365 23.8677 15.4601 24.2531 16.0893C24.6386 16.7186 25.1906 17.229 25.8481 17.564C25.2454 19.7434 24.0978 21.7334 22.5134 23.3467C21.8946 22.9444 21.1766 22.7211 20.4388 22.7016C19.701 22.6821 18.9721 22.8672 18.333 23.2362C17.6938 23.6053 17.1692 24.144 16.8172 24.7928C16.4653 25.4415 16.2997 26.175 16.3387 26.912C14.1493 27.4778 11.8518 27.4769 9.66275 26.9093C9.70148 26.1723 9.53554 25.439 9.18331 24.7904C8.83107 24.1418 8.30627 23.6034 7.66698 23.2346C7.02768 22.8658 6.29882 22.6811 5.56105 22.7009C4.82328 22.7207 4.10536 22.9442 3.48675 23.3467C2.69873 22.5426 2.01554 21.6421 1.45341 20.6667ZM9.00008 20.928C10.4209 21.7475 11.4892 23.0627 12.0001 24.6213C12.6654 24.684 13.3334 24.6853 13.9987 24.6227C14.5099 23.0638 15.5787 21.7486 17.0001 20.9293C18.4204 20.1076 20.0941 19.8393 21.7001 20.176C22.0867 19.632 22.4201 19.052 22.6974 18.4453C21.6033 17.2233 20.9989 15.6403 21.0001 14C21.0001 12.32 21.6267 10.7507 22.6974 9.55468C22.4181 8.94821 22.0834 8.36885 21.6974 7.82401C20.0925 8.16042 18.4198 7.89264 17.0001 7.07201C15.5792 6.2525 14.511 4.93732 14.0001 3.37867C13.3347 3.31601 12.6667 3.31467 12.0014 3.37734C11.4902 4.9362 10.4214 6.25142 9.00008 7.07067C7.57979 7.89243 5.90605 8.1607 4.30008 7.82401C3.91417 8.36839 3.58026 8.94783 3.30275 9.55468C4.39684 10.7768 5.00126 12.3597 5.00008 14C5.00008 15.68 4.37341 17.2493 3.30275 18.4453C3.58204 19.0518 3.9168 19.6312 4.30275 20.176C5.9077 19.8396 7.58036 20.1074 9.00008 20.928ZM13.0001 18C11.9392 18 10.9218 17.5786 10.1717 16.8284C9.42151 16.0783 9.00008 15.0609 9.00008 14C9.00008 12.9391 9.42151 11.9217 10.1717 11.1716C10.9218 10.4214 11.9392 10 13.0001 10C14.0609 10 15.0784 10.4214 15.8285 11.1716C16.5787 11.9217 17.0001 12.9391 17.0001 14C17.0001 15.0609 16.5787 16.0783 15.8285 16.8284C15.0784 17.5786 14.0609 18 13.0001 18ZM13.0001 15.3333C13.3537 15.3333 13.6928 15.1929 13.9429 14.9428C14.1929 14.6928 14.3334 14.3536 14.3334 14C14.3334 13.6464 14.1929 13.3072 13.9429 13.0572C13.6928 12.8072 13.3537 12.6667 13.0001 12.6667C12.6465 12.6667 12.3073 12.8072 12.0573 13.0572C11.8072 13.3072 11.6667 13.6464 11.6667 14C11.6667 14.3536 11.8072 14.6928 12.0573 14.9428C12.3073 15.1929 12.6465 15.3333 13.0001 15.3333Z"
                fill={isActive ? "white" : "#707070"}
              />
            </svg>
          )}
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 25.5C6.09625 25.5 0.5 19.9037 0.5 13C0.5 6.09625 6.09625 0.5 13 0.5C19.9037 0.5 25.5 6.09625 25.5 13C25.5 19.9037 19.9037 25.5 13 25.5ZM13 23C15.6522 23 18.1957 21.9464 20.0711 20.0711C21.9464 18.1957 23 15.6522 23 13C23 10.3478 21.9464 7.8043 20.0711 5.92893C18.1957 4.05357 15.6522 3 13 3C10.3478 3 7.8043 4.05357 5.92893 5.92893C4.05357 7.8043 3 10.3478 3 13C3 15.6522 4.05357 18.1957 5.92893 20.0711C7.8043 21.9464 10.3478 23 13 23ZM11.75 16.75H14.25V19.25H11.75V16.75ZM14.25 14.6937V15.5H11.75V13.625C11.75 13.2935 11.8817 12.9755 12.1161 12.7411C12.3505 12.5067 12.6685 12.375 13 12.375C13.3551 12.375 13.7029 12.2741 14.0029 12.0842C14.3029 11.8942 14.5428 11.623 14.6947 11.302C14.8466 10.981 14.9042 10.6235 14.8609 10.2711C14.8175 9.91861 14.6749 9.58573 14.4498 9.31114C14.2246 9.03655 13.9261 8.83154 13.589 8.71996C13.2519 8.60839 12.89 8.59483 12.5455 8.68088C12.201 8.76693 11.888 8.94904 11.643 9.20602C11.3979 9.463 11.2308 9.78429 11.1613 10.1325L8.70875 9.64125C8.86079 8.88136 9.21189 8.17546 9.72615 7.59573C10.2404 7.016 10.8994 6.58323 11.6357 6.34165C12.3721 6.10007 13.1594 6.05836 13.9171 6.22077C14.6748 6.38318 15.3759 6.74389 15.9485 7.26603C16.5212 7.78817 16.9449 8.45301 17.1764 9.19258C17.4079 9.93215 17.4388 10.7199 17.2661 11.4754C17.0933 12.2308 16.7231 12.9269 16.1932 13.4923C15.6632 14.0578 14.9927 14.4724 14.25 14.6937Z" 
            fill={isActive ? "white" : "#707070"}
            />
            </svg>
          )}
        </NavLink>

        <NavLink
          to='/dashboard'
          className={({ isActive }) =>
            `md:w-12 md:h-12 w-10 h-10 grid place-content-center rounded-s-md transition-colors duration-300 ${
              isActive ? "bg-[#303030]" : "bg-transparent"
            }`
          }
          onClick={handleLogout}
        >
          {({ isActive }) => (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20.5H6.5V23H21.5V3H6.5V5.5H4V1.75C4 1.41848 4.1317 1.10054 4.36612 0.866116C4.60054 0.631696 4.91848 0.5 5.25 0.5H22.75C23.0815 0.5 23.3995 0.631696 23.6339 0.866116C23.8683 1.10054 24 1.41848 24 1.75V24.25C24 24.5815 23.8683 24.8995 23.6339 25.1339C23.3995 25.3683 23.0815 25.5 22.75 25.5H5.25C4.91848 25.5 4.60054 25.3683 4.36612 25.1339C4.1317 24.8995 4 24.5815 4 24.25V20.5ZM6.5 11.75H15.25V14.25H6.5V18L0.25 13L6.5 8V11.75Z"
                fill={isActive ? "white" : "#707070"}
              />
            </svg>
          )}
        </NavLink>
      </section>
    </aside>
  );
};

export default SideBar;
