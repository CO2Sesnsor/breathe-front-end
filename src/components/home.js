import "./loader.css";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import sensorReadingsAPI from "../api/sensorReadings";
import DataCard from "./DataCard";
import Nav from "./nav";

const Cards = () => {
  const [loading, setLoading] = useState(false);
  const [current, setCurrentReading] = useState([]);
  const [readings, setReadings] = useState([]);
  const [prevReading, setPrevReading] = useState([]);

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

  useEffect(() => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      setReadings(data);
    };
    getData();
  }, []);
  useEffect(() => {
    setLoading(true);
    supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "data" },
        (payload) => {
          setCurrentReading(payload);
          setLoading(false);
          setPrevReading(readings[readings.length - 1]);
          readings.push(payload.new);
        }
      )
      .subscribe();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col p-0 m-0 min-h-screen max-w-full justify-center items-center gap-8">
          <div className="loader"></div>
          <div className="loading">Getting Readings</div>
        </div>
      ) : (
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
            {
              <DataCard
                name="VOC"
                current={current}
                prev={prevReading}
                dataParameter="voc"
                threshold={thresholds.voc}
                unit="mg/m³"
              />
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
