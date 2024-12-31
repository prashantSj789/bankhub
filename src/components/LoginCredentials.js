import React from "react";
import { useSelector } from "react-redux";

const LoginCredentials = () => {
  const { user, token, isAuthenticated ,pincode } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name || "User"}!</h1>
      <p>Your token is: {token}</p>
      <p>Your Pincode is:{pincode}</p>
    </div>
  );
};

export default LoginCredentials;