import "./App.css";
// import construction from "./assets/construction.svg";

import Home from "./home";
import Postingcard from "./posting-card";
import Cards from "./cards";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postdata" element={<Postingcard />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
    </div>
  );
}

export default App;
