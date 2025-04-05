import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, isLoading } = useContext(AuthContext); // Assuming `isLoading` is provided by AuthContext

//   console.log("PrivateRoute: user =", user); // Debugging line to check user value

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while user data is being fetched
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
