import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import AuthorizedRoute from "./routes/AuthorizedRoute";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import PropertyPage from "./pages/PropertyPage";
import ComplaintPage from "./pages/ComplaintPage";
import IssuePage from "./pages/IssuePage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<AuthorizedRoute allowedRoles={["admin"]}><UserPage /></AuthorizedRoute>} />
          <Route path="/customer" element={<AuthorizedRoute allowedRoles={["manager"]}><CustomerPage /></AuthorizedRoute>} />
          <Route path="/order" element={<AuthorizedRoute allowedRoles={["manager","customer"]}><OrderPage /></AuthorizedRoute>} />
          <Route path="/property" element={<AuthorizedRoute allowedRoles={["manager"]}><PropertyPage /></AuthorizedRoute>} />
          <Route path="/complaint" element={<AuthorizedRoute allowedRoles={["manager", "customer"]}><ComplaintPage /></AuthorizedRoute>} />
          <Route path="/issue" element={<AuthorizedRoute allowedRoles={["manager", "customer"]}><IssuePage /></AuthorizedRoute>} />
          <Route path="/change-password" element={<AuthorizedRoute allowedRoles={["manager", "customer", "admin"]}><ChangePasswordPage /></AuthorizedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
