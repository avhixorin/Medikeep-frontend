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
import SuperDash from "./components/SuperUser/SuperDash";
import MainContent from "./components/SuperUser/MainContent";
import VerifySuper from "./components/SuperUser/VerifySuper";
import Test from "./Test";
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
const SharingProfilePage = lazy(
  () => import("./components/SharingProfile/SharingProfile")
);
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
const DashboardPatientsPage = lazy(
  () => import("./components/Dashboard/Patients/Patients")
);
const DashboardHealthVitalsPage = lazy(
  () => import("./components/Dashboard/HealthVitals/HealthVitals")
);
const DashboardProfilePage = lazy(
  () => import("./components/Dashboard/Profile/ProfileParent")
);
const DashboardSettingsPage = lazy(
  () => import("./components/Dashboard/Settings/DashboardSettings")
);
const DashboardGeneralSettingsPage = lazy(
  () => import("./components/Dashboard/Settings/General/General")
);
const DashboardBillingSettingsPage = lazy(
  () => import("./components/Dashboard/Settings/Billing/Billing")
);
const DashboardNotificationsSettingsPage = lazy(
  () =>
    import("./components/Dashboard/Settings/Notifications/NotificationSetting")
);
const DashboardSecuritySettingsPage = lazy(
  () => import("./components/Dashboard/Settings/Security/Security")
);
const DashboardSharingSettingsPage = lazy(
  () => import("./components/Dashboard/Settings/Sharing/Sharing")
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
        path="login"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <SignInPage />
          </Suspense>
        }
      />
      <Route
        path="register"
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
        path="profile/:username"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <SharingProfilePage />
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
        >
          <Route
            index
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardGeneralSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="general"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardGeneralSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="security"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardSecuritySettingsPage />
              </Suspense>
            }
          />
          <Route
            path="billing"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardBillingSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="notifications"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardNotificationsSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="sharing"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardSharingSettingsPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="/admin" element={<SuperDash />}>
        <Route index element={<MainContent />} />
      </Route>
      <Route path="/verify" element={<VerifySuper />} />
      <Route path="/test" element={<Test />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
