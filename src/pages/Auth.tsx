import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

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
    <div>
      <p className="text-left text-lg font-light p-4 text-dark-blue">
        Please register or sign in to continue
      </p>
      <div>
        <View width="relative.full">
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
        </View>
      </div>
    </div>
  );
};

export default Auth;
