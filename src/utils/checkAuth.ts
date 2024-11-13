import store from "../redux/store/store";
import { redirect } from "react-router-dom";

const checkAuth = () => {

  const user = store.getState().auth.user;

  if (!user) {
    return redirect('/unauthorized'); 
  }
  return null;
}

export default checkAuth;
