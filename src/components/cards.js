import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";
import DataCard from "./DataCard";

const Cards = () => {
  const [reading, setReading] = useState([]);
  const [time, setTime] = useState();
  const thresholds = {
    co2: {
      good: 1000,
      moderate: 2000,
    },
    voc: {
      good: 300,
      moderate: 500,
    },
  };
  const setData = () => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      // console.log("making request", data);
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
        <DataCard
          name="CO2"
          data={reading}
          dataParameter="co2"
          threshold={thresholds.co2}
          time={time}
        />
        <DataCard
          name="VOC"
          data={reading}
          dataParameter="voc"
          threshold={thresholds.voc}
          time={time}
        />
      </div>
    </>
  );
};

export default Cards;
