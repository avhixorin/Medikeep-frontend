import store from "../components/Redux/store/store"; // Import the store
import { redirect } from "react-router-dom";

const checkAuth = () => {

  const user = store.getState().auth.user;

  if (!user) {
    return redirect('/unauthorized'); 
  }
  return null;
}

export default checkAuth;
