import "./App.css";
// import construction from "./assets/construction.svg";

import Postingcard from "./posting-card";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Chart from "./chart";
import Nav from "./nav";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postdata" element={<Postingcard />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </div>
  );
}

export default App;
