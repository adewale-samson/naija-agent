import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
};

export default Layout;
