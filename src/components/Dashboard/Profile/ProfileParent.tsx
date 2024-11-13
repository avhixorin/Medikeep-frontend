import { useState, useEffect } from 'react';
import DoctorProfile from './doctorProfile/DoctorProfile';
import PatientProfile from './patientProfile/PatientProfile';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export default function ProfileSection() {
  const [userType, setUserType] = useState('patient');
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.clinicAffiliation) {
      setUserType('doctor');
    } else {
      setUserType('patient');
    }
  }, [user]);

  return (
    <div
      className="w-full h-full bg-gradient-to-br from-[#00c9ff]  via-[#92fe9d] to-[#00c9ff]"
    >
      {userType === 'doctor' ? <DoctorProfile user={user} /> : <PatientProfile user={user} />}
    </div>
  );
}
