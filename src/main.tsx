/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import "rsuite/dist/rsuite-no-reset.min.css";
import DashboardAppointmentsPageWrapper from "./components/Dashboard/Appointments/DashboardAppointmentsPageWrapper";
const SignInPage = lazy(() => import("./components/Sign-In/SignInForm"));
const SignUpPage = lazy(() => import("./components/Sign-Up/SignUpForm"));
const ForgotPasswordPage = lazy(() => import("./components/Forgot/Forget"));
const LandingPage = lazy(() => import("./components/Landing-page/LandingPage"));
const UnauthorizedPage = lazy(
  () => import("./components/UnauthorizedPage/Unauthorized")
);
const TermsConditionsPage = lazy(() => import("./components/TnC/TnC"));
const AboutUsPage = lazy(() => import("./components/AboutUs/About"));
const ErrorBoundary = lazy(() => import("./components/ErrorBoundary/Error"));
const DashboardContainer = lazy(
  () => import("./components/Dashboard/ParentContainer/Dashboard")
);
const DashboardWelcomePage = lazy(
  () => import("./components/Dashboard/Welcome/Welcome")
);
const DashboadChatPage = lazy(() => import("./components/Dashboard/Chat/Chat"));
const DashboardMedicalRecordsPage = lazy(
  () => import("./components/Dashboard/Records/MedicalRecords")
);
const DashboardPatientsPage = lazy(() => import("./components/Dashboard/Patients/Patients"));
const DashboardHealthVitalsPage = lazy(
  () => import("./components/Dashboard/HealthVitals/HealthVitals")
);
const DashboardProfilePage = lazy(
  () => import("./components/Dashboard/Profile/ProfileParent")
);
const DashboardSettingsPage = lazy(
  () => import("./components/Dashboard/Settings/DashboardSettings")
);
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
        loader={() => import("./components/UnauthorizedPage/Unauthorized")}
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
        path="forgot"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <ForgotPasswordPage />
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
              <DashboardAppointmentsPageWrapper />
            </Suspense>
          }
        />
        ;
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
          path="patients"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardPatientsPage />
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
          path="settings"
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
