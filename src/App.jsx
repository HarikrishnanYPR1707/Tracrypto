import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Coinpage from "./pages/Coinpage";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundColor: "#14161a",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/coins/:id" Component={Coinpage} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
