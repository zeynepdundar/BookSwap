export type AuthState = {
  loading: boolean;
  error: AuthError | null;
  user: {
    isNewUser: boolean;
    firebaseUserId: string | null;
  };
  authToken: string | null;
  verificationCode: string;
  verificationId: string | null,
  isAuthenticated: boolean;
};

export type AuthError = {
  type: string;
  message: string;
};

export type VerifyCodePayload = {
  verificationId: string;
  verificationCode: string;
};