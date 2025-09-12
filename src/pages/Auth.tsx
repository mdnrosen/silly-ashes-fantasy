import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useEffect } from "react";
import { useLoading } from "../hooks/useLoading";

const Auth = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const loading = useLoading();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      toast?.success(`Welcome back to Silly Ashes - Fantasy`);
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className="animate-fadein mt-10 text-center">
        <div className="text-dark-blue">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="animate-fadein mt-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-dark-blue">
        Silly Ashes Fantasy
      </h1>
      <p className="text-center mb-6 text-dark-blue">
        Please register or sign in to continue.
      </p>
      <Authenticator
        hideSignUp={false}
        signUpAttributes={["email", "nickname"]}
        formFields={{
          signUp: {
            email: {
              order: 1,
              placeholder: "Enter your email",
              label: "Email *",
              required: true,
            },
            nickname: {
              order: 2,
              placeholder: "Enter your nickname",
              label: "Nickname *",
              required: true,
            },
            password: {
              order: 3,
              placeholder: "Enter your password",
              label: "Password *",
            },
            confirm_password: {
              order: 4,
              placeholder: "Confirm your password",
              label: "Confirm Password *",
            },
          },
        }}
      />
    </div>
  );
};

export default Auth;
