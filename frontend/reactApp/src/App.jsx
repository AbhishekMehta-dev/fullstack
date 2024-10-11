// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./Layout";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import "./index.css";

// Admin Route Component for protecting admin-only routes
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes: Accessible by non-admin users */}
      {user && user.role !== "admin" && (
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
      )}

      {/* Admin Routes: Accessible only by admin users */}
      <Route
        path="/new-category"
        element={
          <AdminRoute>
            <CategoryForm />
          </AdminRoute>
        }
      />

      {/* Catch all other routes and redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
