import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./src/layout/GuestLayout";
import AppLayout from "./src/layout/AppLayout";
import Login from "./src/views/auth/Login";
import Register from "./src/views/auth/Register";
import ForgotPassword from "./src/views/auth/ForgotPassword";
import ConfirmAccount from "./src/views/auth/ConfirmAccount";
import ResetPassword from "./src/views/auth/ResetPassword";
import Dashboard from "./src/views/admin/Dashboard";
import Profile from "./src/views/admin/Profile";

const router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/confirm-account/:token',
                element: <ConfirmAccount />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/reset-password/:token',
                element: <ResetPassword />
            }
        ]
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            // {
            //     path: "pets",
            //     element: <Pets />
            // },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    }
]);

export default router;