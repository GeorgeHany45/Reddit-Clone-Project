import { useState } from "react";
import LoginPage from "./loginpage";
import Signup from "./signuppage";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <LoginPage switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup switchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
};

export default AuthPage;