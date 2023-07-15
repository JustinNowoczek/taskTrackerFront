import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFoundRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/action-fail`, { state: { code: "pageNotFound", data: "This Page Does Not Exist" } });
  }, []);
};

export default PageNotFoundRedirect;
