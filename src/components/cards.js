import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";

const Cards = () => {
  const [reading, setReading] = useState([]);

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
      setData();
    }, 1000);

    // Clear side-effect when component unmount (componentWillUnmount)
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  if (reading.length === 0) return null;

  let recentCO2Reading = reading[reading.length - 1]["co2"];
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
        className={` ${cardColorCO2} ${fontColorCO2} p-5  rounded-md flex flex-col `}
      >
        <p className="text-lg">CO2 Reading</p>
        <div className="flex gap-1">
          <p className="text-5xl font-semibold">
            {JSON.stringify(recentCO2Reading)}{" "}
          </p>
          <p className="text-2xl font-light flex items-end">PPM</p>
        </div>
      </div>
    </>
  );
};

export default Cards;
