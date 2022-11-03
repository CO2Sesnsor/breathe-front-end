import "./App.css";
// import construction from "./assets/construction.svg";

import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";
import Postingcard from "./posting-card";
import Home from "./home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [reading, setReading] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      setReading(data);
    };
    getData();
  }, []);

  const addReading = () => {
    sensorReadingsAPI.postReading(inputRef.current.value);
  };

  return (
    <div className="center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postdata" element={<Postingcard />} />
        <Route path="/datadump" element=<div>{JSON.stringify(reading)}</div> />
      </Routes>
    </div>
  );
}

export default App;
