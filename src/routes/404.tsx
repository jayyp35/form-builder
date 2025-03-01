import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function InvalidRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate("/");
  }, [location.pathname]);

  return (
    <div className={"NotFound"}>
      <div className={"Box"}>
        Invalid Route
        {/* <Button
          onClick={() => {
            navigate(-1);
          }}
          text={"Go Back"}
        /> */}
      </div>
    </div>
  );
}
