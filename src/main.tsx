/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import 'rsuite/dist/rsuite-no-reset.min.css';
// import checkAuth from './utils/checkAuth';

// Lazy load all the components
const SignInForm = lazy(() => import('./components/Sign-In/SignInForm'));
const SignUpForm = lazy(() => import('./components/Sign-Up/SignUpForm'));
const LazyHome = lazy(() => import('./components/Landing-page/LandingPage'));
const DoctorAddForm = lazy(() => import('./components/AdditionalInfo/DoctorAddForm'));
const Dashboard = lazy(() => import('./components/Dashboard/ParentContainer/Dashboard'));
const Vitals = lazy(() => import('./components/Dashboard/Home/Home'));
const TermsAndConditions = lazy(() => import('./components/TnC/TnC'));
const Error = lazy(() => import('./components/ErrorBoundary/Error'));
const Appointments = lazy(() => import('./components/Dashboard/Appointments/Appointments'));
const MedicalRecords = lazy(() => import('./components/Dashboard/MedicalRecords/MedicalRecords'));
const Chat = lazy(() => import('./components/Dashboard/Chat/Chat'));
const HealthProfile = lazy(() => import('./components/Dashboard/HealthProfile/Healthprofile'));
const Welcome = lazy(() => import('./components/Dashboard/Welcome/Welcome'));
const Unauthorized = lazy(() => import('./components/UnauthorizedPage/Unauthorized'));
const Profile = lazy(() => import('./components/Dashboard/Profile/ProfileParent'));
const About = lazy(() => import('./components/AboutUs/About'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={
      <Suspense fallback={<LoadingScreen />}>
        <Error />
      </Suspense>
    }>
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingScreen />}>
            <LazyHome />
          </Suspense>
        }
      />
      <Route
        path="about"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <About />
          </Suspense>
        }
      />
      <Route
        path="unauthorized"
        loader={() => import('./components/UnauthorizedPage/Unauthorized')}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Unauthorized />
          </Suspense>
        }
      />
      <Route
        path="tnc"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <TermsAndConditions />
          </Suspense>
        }
      />
      <Route
        path="sign-in"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <SignInForm />
          </Suspense>
        }
      />
      <Route
        path="sign-up"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <SignUpForm />
          </Suspense>
        }
      />
      <Route
        path="doctoraddform"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <DoctorAddForm />
          </Suspense>
        }
      />
      <Route
        path="dashboard"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Dashboard />
          </Suspense>
        }
        // loader={checkAuth}
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Welcome />
            </Suspense>
          }
        />
        
        <Route
          path="profile"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="appointments"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Appointments />
            </Suspense>
          }
        />
        <Route
          path="records"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <MedicalRecords />
            </Suspense>
          }
        />
        <Route
          path="records"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Vitals />
            </Suspense>
          }
        />
        <Route
          path="chats"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Chat />
            </Suspense>
          }
        />
        <Route
          path="settings/healthprofile"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <HealthProfile />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
