import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Routes with Header and Footer */}
        <Route element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Authentication routes without Header and Footer */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
