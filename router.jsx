import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./src/layout/GuestLayout";
import Login from "./src/views/auth/Login";
import Register from "./src/views/auth/Register";
import ForgotPassword from "./src/views/auth/ForgotPassword";
import ConfirmAccount from "./src/views/auth/ConfirmAccount";

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
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/confirm-account/:token',
                element: <ConfirmAccount />
            }
        ]
    }
]);

export default router;