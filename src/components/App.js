import "./App.css";
// import construction from "./assets/construction.svg";

import Postingcard from "./posting-card";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Chart from "./chart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/postdata" element={<Postingcard />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  );
}

export default App;
