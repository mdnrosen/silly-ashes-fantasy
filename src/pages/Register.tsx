import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useEffect, useState } from "react";
import { AuthUser } from "aws-amplify/auth";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const auth = useAuth();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (authUser && auth) {
      auth.refreshUser().then(() => {
        const from = location.state?.from?.pathname || "/players";
        navigate(from, { replace: true });
        toast?.success(`Successfully logged in!`);
      });
    }
  }, [authUser, navigate, location.state, auth, toast]);

  return (
    <div className="animate-fadein">
      <Authenticator 
        hideSignUp={false}
        signUpAttributes={['email', 'nickname']}
                formFields={{
          signUp: {
            email: {
              order: 1,
              placeholder: 'Enter your email',
              label: 'Email *',
              required: true
            },
            nickname: {
              order: 2,
              placeholder: 'Enter your nickname',
              label: 'Nickname *',
              required: true
            },
            password: {
              order: 3,
              placeholder: 'Enter your password',
              label: 'Password *'
            },
            confirm_password: {
              order: 4,
              placeholder: 'Confirm your password',
              label: 'Confirm Password *'
            }
          }
        }}
      >
        {({ user }) => {
          if (user) {
            setAuthUser(user);
          }
          return <div></div>;
        }}
      </Authenticator>
    </div>
  );
};

export default Register;