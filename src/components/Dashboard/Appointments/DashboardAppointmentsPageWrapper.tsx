import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { RootState } from "@/redux/store/store";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const DashboardDoctorAppointmentsPage = lazy(
  () => import("./DoctorsAppointmentDash/DoctorAppointments")
);
const DashboardPatientAppointmentsPage = lazy(
  () => import("./PatientAppointmentDash/PatientAppointments")
);
const DashboardAppointmentsPageWrapper = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;

  if (user === null) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!role) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      {role === "doctor" ? (
        <DashboardDoctorAppointmentsPage />
      ) : (
        <DashboardPatientAppointmentsPage />
      )}
    </Suspense>
  );
};

export default DashboardAppointmentsPageWrapper;
