import { useState, useEffect } from "react";

const Chart = ({ readings }) => {
  const [co2Values, setCo2Values] = useState([]);
  const [vocValues, setVocValues] = useState([]);
  const [timeValues, setTimeValues] = useState([]);
  useEffect(() => {
    let co2 = readings.map((current) => current["co2"]);
    let voc = readings.map((current) => current["voc"]);
    let time = readings.map((current) => {
      let currentTimeStamp = new Date(current["created_at"]);
      let hours = currentTimeStamp.getHours();
      let minutes = currentTimeStamp.getMinutes();
      let seconds = currentTimeStamp.getSeconds();
      return `${hours}:${minutes}:${seconds}`;
    });
    setCo2Values(co2);
    setVocValues(voc);
    setTimeValues(time);
  }, [JSON.stringify(readings)]);
  useEffect(() => {
    // console.log(co2Values);
    console.log(readings);
  }, [co2Values]);

  return (
    <div>
      <h1>{JSON.stringify(co2Values)}</h1>
      <p>{co2Values.length}</p>
      <h1>{JSON.stringify(vocValues)}</h1>
      <p>{vocValues.length}</p>
      <h1>{JSON.stringify(timeValues)}</h1>
      <p>{timeValues.length}</p>
      <h1>{JSON.stringify(readings)}</h1>
    </div>
  );
};

export default Chart;
