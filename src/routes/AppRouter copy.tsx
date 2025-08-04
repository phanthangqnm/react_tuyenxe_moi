// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";

import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";

//import AuthGuard from "../guards/AuthGuard";

import AppLayout from "../layout/AppLayout";
//import PublicLayout from "../layout/AppLayout";

import Home from "../pages/Dashboard/Home";
import SignIn from "../pages/AuthPages/SignIn";

import { ScrollToTop } from "../components/common/ScrollToTop";

export default function AppRouter() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/login" element={<SignIn />} />
                {/* Public Routes */}
                {/* <Route element={<PublicLayout />}> */}
                    {/* <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} /> */}
                    {/* <Route path="/register" element={<Register />} />
                    <Route path="/products/:id" element={<ProductDetail />} /> */}
                {/* </Route> */}

                {/* Customer Routes */}
                {/* <Route element={<AuthGuard />}>
            <Route element={<RoleGuard role="customer" />}>
            <Route path="/customer" element={<CustomerLayout />}>
                <Route path="dashboard" element={<CustomerDashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            </Route>
        </Route> */}

                {/* Admin Routes */}
                <Route element={<AuthGuard />}>
                    <Route element={<RoleGuard role="admin" />}>
                        <Route path="/admin" element={<AppLayout />}>
                            <Route path="dashboard" element={<Home />} />
                            {/* <Route path="users" element={<Users />} />
                <           Route path="settings" element={<Settings />} /> */}
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}