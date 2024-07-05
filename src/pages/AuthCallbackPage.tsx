import { useCreateMyUser } from "../api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const handleUserCreation = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        await createUser({ auth0Id: user.sub, email: user.email });
        hasCreatedUser.current = true;
        navigate("/admin"); // Redirect to admin page after user is created
      }
    };

    if (isAuthenticated && !isLoading) {
      handleUserCreation();
    }
  }, [createUser, navigate, user, isAuthenticated, isLoading]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
