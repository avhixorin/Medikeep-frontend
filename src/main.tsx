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
import CallScreen from "./components/Dashboard/CallScreen/CallScreen";
import Calls from "./components/Dashboard/Calls/Calls";
import DashboardLoadingScreen from "./components/LoadingScreen/DashBoardLoading";
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
          <Suspense fallback={<DashboardLoadingScreen />}>
            <DashboardContainer />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardWelcomePage />
            </Suspense>
          }
        />
        <Route
          path="appointments"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardAppointmentsPageWrapper />
            </Suspense>
          }
        />
        <Route
          path="chats"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboadChatPage />
            </Suspense>
          }
        />
        <Route
          path="calls"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <Calls />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardProfilePage />
            </Suspense>
          }
        />
        <Route
          path="medical-records"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardMedicalRecordsPage />
            </Suspense>
          }
        />
        <Route
          path="patients"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardPatientsPage />
            </Suspense>
          }
        />
        <Route
          path="vitals"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardHealthVitalsPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<DashboardLoadingScreen />}>
              <DashboardSettingsPage />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<DashboardLoadingScreen />}>
                <DashboardGeneralSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="general"
            element={
              <Suspense fallback={<DashboardLoadingScreen />}>
                <DashboardGeneralSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="security"
            element={
              <Suspense fallback={<DashboardLoadingScreen />}>
                <DashboardSecuritySettingsPage />
              </Suspense>
            }
          />
          <Route
            path="billing"
            element={
              <Suspense fallback={<DashboardLoadingScreen />}>
                <DashboardBillingSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="notifications"
            element={
              <Suspense fallback={<DashboardLoadingScreen />}>
                <DashboardNotificationsSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="sharing"
            element={
              <Suspense fallback={<DashboardLoadingScreen />}>
                <DashboardSharingSettingsPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="call"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <CallScreen />
            </Suspense>
          }
        />
      </Route>
      {/* <Route
        path="call/:callId"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <CallScreen />
          </Suspense>
        }
      /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
