import { css } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Coinpage from "./pages/Coinpage";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <Router>
      <div className="app">
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
