import "./App.css";
// import construction from "./assets/construction.svg";

import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";
import Postingcard from "./posting-card";

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
      <Postingcard />
      <div>{JSON.stringify(reading)}</div>
    </div>
  );
}

export default App;
