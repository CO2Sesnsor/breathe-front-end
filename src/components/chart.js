import { useState, useEffect } from "react";

const Chart = ({ readings }) => {
  const [co2Values, setCo2Values] = useState([]);
  useEffect(() => {
    let co2 = readings.map((a) => a["co2"]);
    setCo2Values(co2);
  }, [JSON.stringify(readings)]);
  useEffect(() => {
    // console.log(co2Values);
    console.log(readings);
  }, [co2Values]);

  return <h1>{JSON.stringify(co2Values)}</h1>;
};

export default Chart;
