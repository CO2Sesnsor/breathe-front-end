import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";
import CO2 from "./co2card";
import VOC from "./vocCard";

const Cards = () => {
  const [reading, setReading] = useState([]);
  const [time, setTime] = useState();

  const setData = () => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      console.log("making request", data);
      setReading(data);
    };
    getData();
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setData();
    }, 1000);

    // Clear side-effect when component unmount (componentWillUnmount)
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <CO2 data={reading} time={time} />
        <VOC data={reading} time={time} />
      </div>
    </>
  );
};

export default Cards;
