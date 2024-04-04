import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPageRoute from "./LoginPageRoute";
import QuestionsPage from "../pages/QuestionsPage";

const Routes = () => {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <BrowserRouter>
          <RouterRoutes>
            <Route path="/login" element={<LoginPageRoute />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Navigate to="/home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="questions" element={<QuestionsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </RouterRoutes>
        </BrowserRouter>
      )}
    </>
  );
};

export default Routes;
