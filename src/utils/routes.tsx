import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const AllAppoints = lazy(
  () => import("../components/SuperUser/AllAppointments/AllAppoints")
);
const AllUsers = lazy(
  () => import("../components/SuperUser/AllUsers/AllUsers")
);
const Doctors = lazy(() => import("../components/SuperUser/Doctors/Doctors"));
const Patients = lazy(
  () => import("../components/SuperUser/Patients/Patients")
);
const VerifySuper = lazy(() => import("../components/SuperUser/VerifySuper"));
const SuperDash = lazy(() => import("../components/SuperUser/SuperDash"));
const MainContent = lazy(
  () => import("../components/SuperUser/MainContent/MainContent")
);
const Test = lazy(() => import("../Test"));
const DashboardAppointmentsPageWrapper = lazy(
  () =>
    import(
      "../components/Dashboard/Appointments/DashboardAppointmentsPageWrapper"
    )
);

const SignInPage = lazy(() => import("../components/Sign-In/SignInForm"));
const SignUpPage = lazy(() => import("../components/Sign-Up/SignUpForm"));
// const VerifyEmailPage = lazy(() => import("@/components/Sign-Up/Steps/OtpForm"))
const ForgotPasswordPage = lazy(() => import("../components/Forgot/Forget"));
const LandingPage = lazy(
  () => import("../components/Landing-page/LandingPage")
);
const UnauthorizedPage = lazy(
  () => import("../components/UnauthorizedPage/Unauthorized")
);
const TermsConditionsPage = lazy(() => import("../components/TnC/TnC"));
const AboutUsPage = lazy(() => import("../components/AboutUs/About"));
const ErrorBoundary = lazy(() => import("../components/ErrorBoundary/Error"));
const SharingProfilePage = lazy(
  () => import("../components/SharingProfile/SharingProfile")
);
const DashboardContainer = lazy(
  () => import("../components/Dashboard/ParentContainer/Dashboard")
);
const DashboardWelcomePage = lazy(
  () => import("../components/Dashboard/Welcome/Welcome")
);
const DashboadChatPage = lazy(
  () => import("../components/Dashboard/Chat/Chat")
);
const DashboardRecordsPage = lazy(
  () => import("../components/Dashboard/Records")
);
const DashboardRecordDetailsPage = lazy(
  () => import("../components/Dashboard/Records/RecordDetails")
);
const DashboardPatientsPage = lazy(
  () => import("../components/Dashboard/Patients/Patients")
);
const DashboardDoctorsPage = lazy(
  () => import("../components/Dashboard/Doctors")
);
const DashboardNotificationsPage = lazy(
  () => import("../components/Dashboard/Notifications")
);
const DashboardHealthVitalsPage = lazy(
  () => import("../components/Dashboard/HealthVitals/HealthVitals")
);
const DashboardProfilePage = lazy(
  () => import("../components/Dashboard/Profile/ProfileParent")
);
const DashboardSettingsPage = lazy(
  () => import("../components/Dashboard/Settings/DashboardSettings")
);
const DashboardGeneralSettingsPage = lazy(
  () => import("../components/Dashboard/Settings/General/General")
);
const DashboardBillingSettingsPage = lazy(
  () => import("../components/Dashboard/Settings/Billing/Billing")
);
const DashboardNotificationsSettingsPage = lazy(
  () =>
    import("../components/Dashboard/Settings/Notifications/NotificationSetting")
);
const DashboardSecuritySettingsPage = lazy(
  () => import("../components/Dashboard/Settings/Security/Security")
);
const DashboardSharingSettingsPage = lazy(
  () => import("../components/Dashboard/Settings/Sharing/Sharing")
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
        index
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
      {/* <Route
        path="verify-email"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <VerifyEmailPage />
          </Suspense>
        }
      /> */}
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
          path="records"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardRecordsPage />
            </Suspense>
          }
        >
        <Route
          path="records/:entityId"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardRecordDetailsPage />
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
          path="doctors"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardDoctorsPage />
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
          path="notifications"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardNotificationsPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<LoadingScreen />}>
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
        <Route path="users" element={<AllUsers />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="allAppoints" element={<AllAppoints />} />
      </Route>

      <Route path="/verify" element={<VerifySuper />} />
      <Route path="/test" element={<Test />} />
    </Route>
  )
);

export default router;
