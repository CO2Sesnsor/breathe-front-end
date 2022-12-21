import "./loader.css";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import sensorReadingsAPI from "../api/sensorReadings";
import DataCard from "./DataCard";
import Chart from "./chart";

const Home = () => {
  const [firstDataLoad, setFirstDataLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrentReading] = useState([]);
  const [readings, setReadings] = useState([]);
  const [prevReading, setPrevReading] = useState([]);
  const [timeInterval, setTimeInterval] = useState(10);
  const [averageInterval, setAverageInterval] = useState(4);
  const [maxPoints, setMaxPoints] = useState(40);

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

  const setChartParams = (interval, average, max) => {
    setTimeInterval(interval);
    setAverageInterval(average);
    setMaxPoints(max);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await sensorReadingsAPI.getReadings();
      setReadings(data);
      setFirstDataLoad(true);
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
          if (readings.length === 0) {
            setPrevReading(payload.new);
          } else {
            setPrevReading(readings[readings.length - 1]);
          }
          const updatedReadings = Object.assign(readings);
          updatedReadings.push(payload.new);
          setReadings(updatedReadings);
          setLoading(false);
        }
      )
      .subscribe();
  }, [firstDataLoad]);

  // useEffect(() => {
  //   console.log(readings.length);
  // }, [readings, timeInterval]);

  return (
    <>
      <div className="px-6 flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col items-center gap-2 justify-center py-3 px-5 border rounded-md w-full">
          <p className="font-jakarta flex w-full justify-start font-bold text-lg">
            Readings
          </p>
          <DataCard
            name="CO₂"
            current={current}
            prev={prevReading}
            dataParameter="co2"
            threshold={thresholds.co2}
            unit="PPM"
            loading={loading}
          />
          <DataCard
            name="VOC"
            current={current}
            prev={prevReading}
            dataParameter="voc"
            threshold={thresholds.voc}
            unit="mg/m³"
            loading={loading}
          />
        </div>
        <div className="flex flex-col items-center gap-2 justify-center py-3 px-5 border rounded-md w-full">
          <div className="flex justify-between w-full items-center">
            <p className="font-jakarta flex w-full justify-start font-bold text-lg">
              Chart
            </p>

            <button
              autoFocus
              type="radio"
              className="rounded-l px-1.5 py-1 text-xs font-jakarta w-14 bg-slate-200 focus:outline-none focus:bg-cyan-500 focus:text-white"
              onClick={() => setChartParams(10, 4, 40)}
            >
              10MIN
            </button>
            <button
              disabled={readings.length < 240}
              type="radio"
              className="px-1.5 py-1 text-xs font-jakarta w-14 bg-slate-200 focus:outline-none focus:bg-cyan-500 focus:text-white disabled:opacity-50"
              onClick={() => setChartParams(60, 20, 240)}
            >
              1HR
            </button>
            <button
              disabled={readings.length < 1440}
              type="radio"
              className="px-1.5 py-1 text-xs font-jakarta w-14 bg-slate-200 focus:outline-none focus:bg-cyan-500 focus:text-white disabled:opacity-50"
              onClick={() => setChartParams(360, 80, 1440)}
            >
              6HR
            </button>
            <button
              disabled={readings.length < 5670}
              type="radio"
              className="rounded-r px-1.5 py-1 text-xs font-jakarta w-14 bg-slate-200 focus:outline-none focus:bg-cyan-500 focus:text-white disabled:opacity-50"
              onClick={() => setChartParams(1440, 240, 5760)}
            >
              24HR
            </button>
          </div>
          <Chart
            readings={readings}
            timeInterval={timeInterval}
            averageInterval={averageInterval}
            maxPoints={maxPoints}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
