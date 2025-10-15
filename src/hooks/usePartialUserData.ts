import {
  setUserAppointmentRequests,
  setUserAppointments,
  setUserConnectionRequests,
  setUserConnections,
  updateUserFields,
} from "@/redux/features/authSlice";
import { setChatHistory } from "@/redux/features/messageSlice";
import { useDispatch } from "react-redux";

const usePartialUserData = () => {
  const url = import.meta.env.VITE_BASE_URL + "/getUserData";
  const dispatch = useDispatch();
  const fetchPartialUserData = async (field: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ field }),
    });
    if (res.ok) {
      const data = await res.json();
      if (field === "appointments") {
        dispatch(setUserAppointments(data.data.appointments));
        dispatch(setUserAppointmentRequests(data.data.appointmentRequests));
      } else if (field === "connections") {
        dispatch(setUserConnections(data.data.connections));
        dispatch(setUserConnectionRequests(data.data.connectionRequests));
        dispatch(setChatHistory(data.data.chatHistory));
      } else {
        dispatch(updateUserFields({ [field]: data.data[field] }));
      }
    } else {
      console.log("There was an error fetching the data");
    }
  };
  return {
    fetchPartialUserData,
  };
};

export default usePartialUserData;
