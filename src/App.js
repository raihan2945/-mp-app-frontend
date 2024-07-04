import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "./redux/features/user/userApi";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import './App.css'

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";


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
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route exact path="/*" element={<PrivateOutlet />}>
          <Route path="dashboard" element={<Contacts />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
