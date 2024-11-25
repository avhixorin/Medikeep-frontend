/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import 'rsuite/dist/rsuite-no-reset.min.css';

const SignInPage = lazy(() => import('./components/Sign-In/SignInForm'));
const SignUpPage = lazy(() => import('./components/Sign-Up/SignUpForm'));
const LandingPage = lazy(() => import('./components/Landing-page/LandingPage'));
const UnauthorizedPage = lazy(() => import('./components/UnauthorizedPage/Unauthorized'));
const DoctorAdditionalInfoForm = lazy(() => import('./components/AdditionalInfo/DoctorAddForm'));
const TermsConditionsPage = lazy(() => import('./components/TnC/TnC'));
const AboutUsPage = lazy(() => import('./components/AboutUs/About'));
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary/Error'));
const DashboardContainer = lazy(() => import('./components/Dashboard/ParentContainer/Dashboard'));
const DashboardWelcomePage = lazy(() => import('./components/Dashboard/Welcome/Welcome'));
const DashboardAppointmentsPage = lazy(() => import('./components/Dashboard/Appointments/Appointments'));
const DashboadChatPage = lazy(() => import('./components/Dashboard/Chat/Chat'));
const DashboardMedicalRecordsPage = lazy(() => import('./components/Dashboard/MedicalRecords/MedicalRecords'));
const DashboardHealthVitalsPage = lazy(() => import('./components/Dashboard/HealthVitals/HealthVitals'));
const DashboardProfilePage = lazy(() => import('./components/Dashboard/Profile/ProfileParent'));
const DashboardSettingsPage = lazy(() => import("./components/Dashboard/Settings/DashboardSettings"))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={
        <Suspense fallback={<LoadingScreen />}>
          <ErrorBoundary />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingScreen />}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route
        path="about"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <AboutUsPage />
          </Suspense>
        }
      />
      <Route
        path="unauthorized"
        loader={() => import('./components/UnauthorizedPage/Unauthorized')}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <UnauthorizedPage />
          </Suspense>
        }
      />
      <Route
        path="tnc"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <TermsConditionsPage />
          </Suspense>
        }
      />
      <Route
        path="sign-in"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <SignInPage />
          </Suspense>
        }
      />
      <Route
        path="sign-up"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <SignUpPage />
          </Suspense>
        }
      />
      <Route
        path="doctor-additional-info"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <DoctorAdditionalInfoForm />
          </Suspense>
        }
      />
      <Route
        path="dashboard"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <DashboardContainer />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardWelcomePage />
            </Suspense>
          }
        />
          
          <Route
            path="appointments"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardAppointmentsPage />
              </Suspense>
            }
          />
          
          <Route
          path="chats"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboadChatPage />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardProfilePage />
            </Suspense>
          }
        />
        <Route
          path="medical-records"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardMedicalRecordsPage />
            </Suspense>
          }
        />
        <Route
          path="vitals"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardHealthVitalsPage />
            </Suspense>
          }
        />
        <Route 
        path='settings'
        element={
          <Suspense>
            <DashboardSettingsPage />
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
