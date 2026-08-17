import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TourDetail from "./pages/TourDetail";

import Overview from "./pages/Overview";
import Tours from "../assets/data/tours.json";
import Bookings from "./pages/Bookings";
import AuthGuard from "./authGuard";
import AboutUs from "./pages/AboutUs";

const App = () => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header
          user={null}
          onLogout={() => {}}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<Overview tours={Tours} searchVal={searchVal} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/bookings"
              element={
                <AuthGuard>
                  <Bookings />
                </AuthGuard>
              }
            />
            <Route path="/tour/:id" element={<TourDetail tours={Tours} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
