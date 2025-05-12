import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import RootLayout from "./layouts/RootLayout";
import Trending from "./Pages/Trending";
import CityPage from "./Pages/CityPage";
import AgentForm from "./Pages/AgentForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import Verify from "./Pages/Verify";
import Verified from "./Pages/Verified";
import AgentDetails from "./Pages/AgentDetails";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetNotification from "./Pages/ResetNotification";
import SetPassword from "./Pages/SetPassword";
import Layout from "./layouts/FramerLayout";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Layout>
      <div className="app-container">
      <Routes>
        {/* Routes with Header and Footer */}
        <Route element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="trending" element={<Trending />} />
          <Route path="location/:cityName" element={<CityPage />} />
        </Route>

        {/* Authentication routes without Header and Footer */}
        <Route
          path="agentform"
          element={
            <ProtectedRoute>
              <AgentForm />
            </ProtectedRoute>
          }
        />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<Verify />} />
        <Route path="verified" element={<Verified />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-success" element={<ResetNotification />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/agent/:id" element={<AgentDetails />} />
      </Routes>
      </div>
    </Layout>
  );
}

export default App;
