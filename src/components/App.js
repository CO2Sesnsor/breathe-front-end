import "./App.css";
// import construction from "./assets/construction.svg";

import Postingcard from "./posting-card";
import Cards from "./home";
import { Route, Routes } from "react-router-dom";
import Chart from "./chart";
import Realtime from "./realtime";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cards />} />
      <Route path="/postdata" element={<Postingcard />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/realtime" element={<Realtime />} />
    </Routes>
  );
}

export default App;
