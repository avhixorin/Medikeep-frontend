import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import usePartialUserData from "@/hooks/usePartialUserData";
import { RootState } from "@/redux/store/store";
import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
const DashboardDoctorAppointmentsPage = lazy(
  () => import("./DoctorsAppointmentDash/DoctorAppointments")
);
const DashboardPatientAppointmentsPage = lazy(
  () => import("./PatientAppointmentDash/PatientAppointments")
);
const DashboardAppointmentsPageWrapper = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;
  const { fetchPartialUserData } = usePartialUserData();
  useEffect(() => {
    if(!user?.appointments){
      fetchPartialUserData("appointments");
    }
  }, [fetchPartialUserData, user?.appointments])

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
