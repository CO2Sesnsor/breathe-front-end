import "./App.css";
import construction from "./assets/construction.svg";

import { useState, useEffect } from "react";
import sensorReadingsAPI from "./api/sensorReadings";

function App() {
  const [reading, setReading] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      setReading(data);
    };
    getData();
  }, []);

  return (
    <div className="center">
      <div>{JSON.stringify(reading)}</div>
      <h1>COMING SOON</h1>
      <div className="scale-construction-img">
        <img src={construction} alt="site under construction" />
      </div>
    </div>
  );
}

export default App;
