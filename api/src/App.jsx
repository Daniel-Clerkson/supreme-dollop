import AuthPage from "./pages/AuthenticationPage";
import CreateUserForm from "./components/Auth/CreateAccount";
import ForgotPasswordForm from "./components/Auth/ForgotPassword";
import LoginForm from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import Home from "./pages/HomePage";
import Mainlayout from "./components/Layout/Mainlayout";
import NotFoundPage from "./pages/ErrorPage";
import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./index.css"

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/admin" element={<AuthPage />} />
        <Route path="/create-account" element={<CreateUserForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
