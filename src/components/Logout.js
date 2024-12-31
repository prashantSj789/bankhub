import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  return <button onClick={handleLogout}></button>;
};

export default Logout;