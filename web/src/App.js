import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

// Components
import Navbar from "./containers/Navbar";
import BaseRoutes from "./components/routing/routes";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <BaseRoutes />
    </Router>
  );
};

export default App;
