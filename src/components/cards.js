import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";

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

  if (reading.length === 0) return null;

  let recentCO2Reading = reading[reading.length - 1]["co2"];
  let previousCO2Reading = reading[reading.length - 2]["co2"];
  let percentChange =
    ((recentCO2Reading - previousCO2Reading) / previousCO2Reading) * 100;
  let cardColorCO2 = "";
  let fontColorCO2 = "";
  if (recentCO2Reading < 1000) {
    cardColorCO2 = "bg-green-200";
    fontColorCO2 = "text-green-700";
  } else if (recentCO2Reading > 1000 && recentCO2Reading < 2000) {
    cardColorCO2 = "bg-orange-200";
    fontColorCO2 = "text-orange-700";
  } else if (recentCO2Reading > 2000) {
    cardColorCO2 = "bg-red-200";
    fontColorCO2 = "text-red-700";
  }

  return (
    <>
      <div
        className={` ${cardColorCO2} ${fontColorCO2} py-5 px-8 rounded-md flex flex-col gap-5 w-96`}
      >
        <div className="flex justify-between">
          <p className="text-lg font-normal font-jakarta">CO2 Reading</p>
          <p className="text-lg font-normal font-jakarta">{time}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-5xl font-bold font-jakarta">
            {JSON.stringify(recentCO2Reading)}{" "}
          </p>
          <p className="text-2xl font-normal flex items-end font-jakarta">
            PPM
          </p>
        </div>
        <p>{percentChange}</p>
      </div>
    </>
  );
};

export default Cards;
