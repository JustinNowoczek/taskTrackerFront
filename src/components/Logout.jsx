import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  Cookies.remove("authToken");
  Cookies.remove("userID");
  useEffect(() => {
    navigate("/login");
  }, []);
};

export default Logout;
