import { setUserAppointmentRequests, setUserAppointments } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const usePartialUserData = () => {
    const url = import.meta.env.VITE_USER_PARTIAL_DATA_URL;
    const dispatch = useDispatch();
    const fetchPartialUserData = async (field: string) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ field })
        })
        if(res.ok){
            const data = await res.json();
            if(field === "appointments"){
                dispatch(setUserAppointments(data.appointments));
                dispatch(setUserAppointmentRequests(data.appointmentRequests));
            }
            console.log("The data from the field request is: ", data);
        }else{
            console.log("There was an error fetching the data");
        }
    }
    return {
        fetchPartialUserData
    }
}

export default usePartialUserData;