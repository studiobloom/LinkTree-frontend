import { useCreateMyUser } from "../api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import LoadingIcons from "react-loading-icons";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/dashboard");
  }, [createUser, navigate, user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoadingIcons.Puff stroke="#98ff98" strokeOpacity={.125} height="100" width="100" />
      <span className="text-white mt-2 text-lg font-bold">Loading...</span>
    </div>
  );
};

export default AuthCallbackPage;