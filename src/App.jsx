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
import ProtectedRoute from "./components/ProtectedRoute";
import Verify from "./Pages/Verify";
import Verified from "./Pages/Verified";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Routes with Header and Footer */}
        <Route element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="trending" element={<Trending />} />
          <Route path=":cityName" element={<CityPage />} />
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
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<Verify />} />
        <Route path="verified" element={<Verified />} />
      </Routes>
    </div>
  );
}

export default App;
