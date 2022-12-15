import "./loader.css";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import sensorReadingsAPI from "../api/sensorReadings";
import DataCard from "./DataCard";
import Nav from "./nav";

const Cards = () => {
  const [loading, setLoading] = useState(false);
  const [current, setCurrentReading] = useState([]);
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
    setLoading(true);
    supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "data" },
        (payload) => {
          setCurrentReading(payload);
          setLoading(false);
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      setPrevReading(data[data.length - 1]);
      console.log(data);
    };
    getData();
  }, [current]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col p-0 m-0 min-h-screen max-w-full justify-center items-center gap-8">
          <div class="loader"></div>
          <div class="loading">Getting Readings</div>
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
          <h1>{JSON.stringify(current)}</h1>
          <h1>{JSON.stringify(prevReading)}</h1>
        </div>
      )}
    </>
  );
};

export default Cards;
