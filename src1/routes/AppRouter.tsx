// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from "react-router";

// import AuthGuard from "../guards/AuthGuard";
// import RoleGuard from "../guards/RoleGuard";

import AuthGuard from "../guards/AuthGuard";
import RoleGuard from "../guards/RoleGuard";

//import AuthGuard from "../guards/AuthGuard";

import AppLayout from "../layout/AppLayout";
//import PublicLayout from "../layout/AppLayout";

import Home from "../pages/Dashboard/Home";
import SignIn from "../pages/AuthPages/SignIn";

//demopage
import SignUp from "../pages/AuthPages/SignUp";
// import UserProfiles from "../pages/UserProfiles";
// import Videos from "../pages/UiElements/Videos";
// import Images from "../pages/UiElements/Images";
// import Alerts from "../pages/UiElements/Alerts";
// import Badges from "../pages/UiElements/Badges";
// import Avatars from "../pages/UiElements/Avatars";
// import Buttons from "../pages/UiElements/Buttons";
// import LineChart from "../pages/Charts/LineChart";
// import BarChart from "../pages/Charts/BarChart";
// import Calendar from "../pages/Calendar";
// import BasicTables from "../pages/Tables/BasicTables";
// import FormElements from "../pages/Forms/FormElements";
// import Blank from "../pages/Blank";

//page 404
import NotFound from "../pages/OtherPage/NotFound";

//new
import TuyenXe from "../pages/TuyenXe/TuyenXe";
import HopDong from "../pages/TuyenXe/Hopdong";

//QLy User
import User from "../pages/User/User";


import { ScrollToTop } from "../components/common/ScrollToTop";

export default function AppRouter() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />


                {/* Admin Routes */}
                <Route element={<AuthGuard />}>
                    <Route element={<RoleGuard role="admin" />}>
                        <Route path="/admin" element={<AppLayout />}>
                            <Route path="dashboard" element={<Home />} />
                        </Route>
                    </Route>
                </Route>


                {/* route page demo */}
                <Route element={<AppLayout />}>
                    <Route index path="/" element={<TuyenXe />} />
                    {/* Others Page */}
                    

                    {/* moi */}
                    <Route path="/tuyenxe" element={<TuyenXe />} />
                    <Route path="/hopdong" element={<HopDong />} />

                    <Route path="/user" element={<User />} />

                </Route>

                {/* Catch all unmatched routes */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    );
}