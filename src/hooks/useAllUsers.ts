import { setAllUsers } from "@/redux/features/allUsersSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useAllUsers = () => {
  const dispatch = useDispatch();
  const fetchAllUsersUrl = import.meta.env.VITE_FETCH_ALL_USERS_URL;
  const fetchAllUsers = async () => {
    const response = await axios.get(fetchAllUsersUrl, {
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch(setAllUsers(response.data?.data));
    } else {
      toast.error("Failed to fetch all users");
    }
  };

  return { fetchAllUsers };
};

export default useAllUsers;
