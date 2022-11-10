import { useState, useEffect } from "react";
import sensorReadingsAPI from "../api/sensorReadings";

const Chart = () => {
  const [reading, setReading] = useState();
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
      setData();
    }, 1000);

    // Clear side-effect when component unmount (componentWillUnmount)
    return () => {
      clearInterval(myInterval);
    };
  }, []);
  return <h1>{JSON.stringify(reading)}</h1>;
};

export default Chart;
