import { useState, useEffect } from "react";

const Chart = ({ readings }) => {
  const [co2Values, setCo2Values] = useState([]);
  const [vocValues, setVocValues] = useState([]);
  useEffect(() => {
    let co2 = readings.map((current) => current["co2"]);
    let voc = readings.map((current) => current["voc"]);
    setCo2Values(co2);
    setVocValues(voc);
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
    </div>
  );
};

export default Chart;
