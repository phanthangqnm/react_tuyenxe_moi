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
//Test Login - Logout
import LogIn from "../pages/AuthPages/LogIn";
import LogOut from "../pages/AuthPages/LogOut";

//demopage
import SignUp from "../pages/AuthPages/SignUp";
import UserProfiles from "../pages/UserProfiles";
import Videos from "../pages/UiElements/Videos";
import Images from "../pages/UiElements/Images";
import Alerts from "../pages/UiElements/Alerts";
import Badges from "../pages/UiElements/Badges";
import Avatars from "../pages/UiElements/Avatars";
import Buttons from "../pages/UiElements/Buttons";
import LineChart from "../pages/Charts/LineChart";
import BarChart from "../pages/Charts/BarChart";
import Calendar from "../pages/Calendar";
import BasicTables from "../pages/Tables/BasicTables";
import FormElements from "../pages/Forms/FormElements";
import Blank from "../pages/Blank";

//page 404
import NotFound from "../pages/OtherPage/NotFound";

//new
import TuyenXe from "../pages/TuyenXe/TuyenXe";
import HopDong from "../pages/TuyenXe/Hopdong";

import Todo from "../pages/Todo/Todo";
import Todo2 from "../pages/Todo2/Todo2";

import { ScrollToTop } from "../components/common/ScrollToTop";

import ListKho from '../pages/Kho/List'
import Sort_Table from '../pages/Kho/Sort_Table'
import Full_Table from '../pages/Kho/Full_Table'
import UploadFile from "../pages/Kho/UploadFile";

export default function AppRouter() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* <Route path="/login" element={<SignIn />} /> */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                
                <Route path="/login" element={<LogIn />} />
                {/* <Route path="/logout" element={<LogOut />} /> */}

                {/* Admin Routes */}
                <Route element={<AuthGuard />}>
                    <Route element={<RoleGuard role="admin" />}>
                        <Route path="/admin" element={<AppLayout />}>
                            <Route path="dashboard" element={<Home />} />
                            <Route path="todo" element={<Todo />} />
                            <Route path="todo2" element={<Todo2 />} />
                            
                        </Route>                        
                    </Route>
                </Route>


                {/* route page demo */}
                <Route element={<AppLayout />}>
                    <Route index path="/" element={<Home />} />
                    {/* Others Page */}
                    <Route path="/profile" element={<UserProfiles />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/blank" element={<Blank />} />

                    {/* Forms */}
                    <Route path="/form-elements" element={<FormElements />} />

                    {/* Tables */}
                    <Route path="/basic-tables" element={<BasicTables />} />

                    {/* Ui Elements */}
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/avatars" element={<Avatars />} />
                    <Route path="/badge" element={<Badges />} />
                    <Route path="/buttons" element={<Buttons />} />
                    <Route path="/images" element={<Images />} />
                    <Route path="/videos" element={<Videos />} />

                    {/* Charts */}
                    <Route path="/line-chart" element={<LineChart />} />
                    <Route path="/bar-chart" element={<BarChart />} />

                    {/* moi */}
                    <Route path="/tuyenxe" element={<TuyenXe />} />
                    <Route path="/hopdong" element={<HopDong />} />

                    <Route path="/kho" element={<ListKho />} />
                    <Route path="/sort_table" element={<Sort_Table />} />
                    <Route path="/full_table" element={<Full_Table />} />
                    <Route path="/upload_file" element={<UploadFile />} />
                </Route>

                {/* Catch all unmatched routes */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    );
}