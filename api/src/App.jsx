import AuthPage from "./pages/AuthenticationPage";
import CreateUserForm from "./components/Auth/CreateAccount";
import ForgotPasswordForm from "./components/Auth/ForgotPassword";
import LoginForm from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import Display from "./components/Display";
import Mainlayout from "./components/Layout/Mainlayout";
import NotFoundPage from "./pages/ErrorPage";
import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./index.css"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<CreateUserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/admin" element={<AuthPage />} />
        <Route path="/display" element={<Display />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
