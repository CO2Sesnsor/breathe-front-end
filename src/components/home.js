import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import sensorReadingsAPI from "../api/sensorReadings";
import DataCard from "./DataCard";
import Nav from "./nav";
import readings from "../api/sensorReadings";

const Cards = () => {
  const [reading, setReadings] = useState([]);
  const [current, setCurrentReading] = useState([]);
  const [prevReading, setPrevReading] = useState([]);
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

  console.log("poo");

  // useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     setTime(new Date().toLocaleTimeString());
  //     setData();
  //   }, 1000);

  //   // Clear side-effect when component unmount (componentWillUnmount)
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, []);

  useEffect(() => {
    supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "data" },
        (payload) => {
          setCurrentReading(payload);
        }
      )
      .subscribe((status) => console.log(`status: ${status}`));
  }, []);

  useEffect(() => {
    console.log("set");
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      setPrevReading(data[data.length - 1]);
    };
    getData();
    setPrevReading(reading[reading.length - 1]);
  }, [current]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <Nav />
        <div className="flex flex-col gap-5 items-center justify-center">
          <DataCard
            name="CO₂"
            current={current}
            prev={prevReading}
            dataParameter="co2"
            threshold={thresholds.co2}
            unit="PPM"
          />
          {/* <DataCard
            name="VOC"
            current={current}
            prev={prevReading}
            dataParameter="voc"
            threshold={thresholds.voc}
            unit="mg/m³"
          /> */}
        </div>
        <h1>{JSON.stringify(current)}</h1>
        <h1>{JSON.stringify(prevReading)}</h1>
      </div>
    </>
  );
};

export default Cards;
