import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

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
  const options = {
    responsive: true,
    plugins: {
      legend: true,
    },
  };
  const data = {
    labels: timeValues,
    datasets: [
      {
        label: "CO₂",
        data: co2Values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "VOC",
        data: vocValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      {/* <h1>{JSON.stringify(co2Values)}</h1>
      <p>{co2Values.length}</p>
      <h1>{JSON.stringify(vocValues)}</h1>
      <p>{vocValues.length}</p>
      <h1>{JSON.stringify(timeValues)}</h1>
      <p>{timeValues.length}</p>
      <h1>{JSON.stringify(readings)}</h1> */}
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
