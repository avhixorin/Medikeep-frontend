import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import SignInForm from './components/Sign-In/SignInForm';
import SignUpForm from './components/Sign-Up/SignUpForm';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import LazyHome from './components/Landing-page/LazyHome';
import DoctorAddForm from './components/AdditionalInfo/DoctorAddForm';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Dashboard from './components/Dashboard/ParentContainer/Dashboard';
import Home from './components/Dashboard/Home/Home';
import TermsAndConditions from './components/TnC/TnC';
import Error from './components/ErrorBoundary/Error';
import Appointments from './components/Dashboard/Appointments/Appointments';
import MedicalRecords from './components/Dashboard/MedicalRecords/MedicalRecords';
import Chat from './components/Dashboard/Chat/Chat';
import HealthProfile from './components/Dashboard/HealthProfile/Healthprofile';
import Unauthorized from './components/UnauthorizedPage/Unauthorized';
// import Profile from './components/Dashboard/Profile/Profile';
import About from './components/AboutUs/About';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingScreen />}>
            <LazyHome />
          </Suspense>
        }
      />
      <Route path='about' element={<About />} />
      <Route path='unauthorized' element={<Unauthorized/>}></Route>
      <Route path="tnc" element={<TermsAndConditions />} />
      <Route path="sign-in" element={<SignInForm />} />
      <Route path="sign-up" element={<SignUpForm />} />
      <Route path="doctoraddform" element={<DoctorAddForm />} />
      <Route path="dashboard/" element={<Dashboard/>}>
        <Route index element={<Home />} />
        {/* <Route path='profile' element={<Profile />} /> */}
        <Route path='appointments' element={<Appointments/>}/>
        <Route path='records' element={<MedicalRecords/>}/>
        <Route path='chats' element={<Chat/>}/>
        <Route path='settings/healthprofile' element={<HealthProfile/>}/>
      </Route>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

