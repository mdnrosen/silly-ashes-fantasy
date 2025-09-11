const { VITE_USER_POOL_ID, VITE_USER_POOL_CLIENT_ID, VITE_IDENTITY_POOL_ID } =
  import.meta.env;

const outputs = {
  Auth: {
    Cognito: {
      userPoolId: VITE_USER_POOL_ID,
      userPoolClientId: VITE_USER_POOL_CLIENT_ID,
      identityPoolId: VITE_IDENTITY_POOL_ID,
      signUpVerificationMethod: "code" as const,
      loginWith: {
        email: true,
        username: false,
      },
    },
  },
};

export default outputs;
