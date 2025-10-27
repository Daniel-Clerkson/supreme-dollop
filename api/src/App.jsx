import AuthPage from "./pages/AuthenticationPage";
import CreateUserForm from "./components/Auth/AuthHeroWelcome";
import LoginForm from "./components/Auth/AuthHeroLogin";
import ForgotPasswordForm from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Home from "./pages/HomePage";
import Mainlayout from "./components/Layout/Mainlayout";
import NotFoundPage from "./pages/ErrorPage";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Wedding from "./components/Wedding/Wedding";
import Corporate from "./components/Corporate/Corporate";
import Schools from "./components/Schools/School";
import Shop from "./components/Shop/Shop";
import Contact from "./components/Contact/Contact";
import Verify from "./components/Auth/AuthHeroVerify";
import Privacy from "./pages/Legal Page/Privacy";
import ProductPage from "./components/Shop/Product";
import AccountPage from "./pages/ProfilePage";
import AuthHeroProfile from "./components/Auth/AuthHeroProfile";
import AdminDashboard from "./components/AdminPage/AdminPage";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AuthPage />} />
        <Route path="/create-profile" element={<AuthHeroProfile />} />
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/terms-condition" element={<Privacy />} />
        <Route path="/create-account" element={<CreateUserForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
