import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "./redux/features/user/userApi";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import './App.css'

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import PrivateOutlet from "./components/routing/privateOutlet";
import PrivateRoute from "./components/routing/privateRoute";
import Contacts from "./pages/Contacts/Contacts";
import Appointments from "./pages/Appointments/Appointments";
import AppointmentTable from "./views/Appointments/AppointmentTable";
import AppointmentCalender from "./views/Appointments/AppointmentCalender";
import LetterBox from "./pages/LetterBox/LetterBox";

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
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route exact path="/*" element={<PrivateOutlet />}>
          <Route path="dashboard" element={<Contacts />} />
          <Route path="letter-box" element={<LetterBox />} />
          <Route path="appointments" element={<Appointments />} >
            <Route path="" element={<AppointmentTable />} />
            <Route path="calender" element={<AppointmentCalender />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
