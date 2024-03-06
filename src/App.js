import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetUserQuery } from "./redux/features/user/userApi";
import { ConfigProvider } from "antd";

import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";

// import './App.css'

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import Doctors from "./pages/Doctor/Doctors";
import DoctorProfile from "./pages/Doctor/Profile";
import Mio from "./pages/Mio/Mio";
import Chemists from "./pages/Chemist/Chemists";
import Promotion from "./pages/Promotion/Promotion";
import Survey from "./pages/Survey/Survey";
import Campaign from "./pages/Promotion/Campaign";
import Drafts from "./pages/Promotion/Drafts";
import MIOProfile from "./pages/Mio/Profile";
import ChemistProfile from "./pages/Chemist/Profile";
import Campaigns from "./pages/Campaigns/Campaigns";
import CampaignDetails from "./pages/Campaigns/CampaignDetails";
import PrivateOutlet from "./components/routing/privateOutlet";
import PrivateRoute from "./components/routing/privateRoute";
import Contacts from "./pages/Contacts/Contacts";

function App() {
  const accessToken = useSelector((state) => state?.auth?.accessToken);

  const { data, refetch: refetchBaseUser } = useGetUserQuery();

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route
          path="/sign-in"
          exact
          element={<SignIn refetchBaseUser={refetchBaseUser} />}
        />

        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/*" element={<PrivateOutlet />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
