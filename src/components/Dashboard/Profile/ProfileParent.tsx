import { useState, useEffect } from 'react';
import DoctorProfile from './doctorProfile/DoctorProfile';
import PatientProfile from './patientProfile/PatientProfile';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import ProfileHeader from './ProfileHeader';

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
      className="w-full h-full bg-transparent dark:bg-[#141414]"
    >
      <ProfileHeader user={user!} />
      {userType === 'doctor' ? <DoctorProfile user={user} /> : <PatientProfile user={user} />}
    </div>
  );
}
