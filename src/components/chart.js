import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, zoomPlugin);

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

  const options = {
    responsive: true,
    plugins: {
      title: {
        text: "CO2 Line chart",
        display: true,
        padding: {
          top: 20,
          bottom: 20,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 40,
        },
      },
      zoom:{
        zoom:{
          wheel:{
            enabled: true,
            speed: 0.05,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
        pan:{
          enabled: true,
        }
      }
    },
    scales: {
      x: {
        title: {
          text: "Time (HH:MM:SS)",
          display: true,
        },

        ticks:{
          maxTicksLimit: 20,
        }
      },
      y: {
        title: {
          text: "CO2",
          display: true,
        },
        min: 0,
      },

      y1: {
        title: {
          text: "VOC",
          display: true,
        },
        min: 0,
        position: "right",
      }
    }
  };

  const data = {
    labels: timeValues,
    datasets: [
      {
        label: "CO₂ (pmm)",
        data: co2Values,
        backgroundColor: ["#7eabf2"],
        borderColor: "#7eabf2",
        borderWidth: 1.5,
        radius: 1,
        hitRadius: 20,
        tension: 0.2,
        borderCapStyle: "round",
        yAxisID: "y",
      },
      { 
        label: "VOC (ppb)",
        data: vocValues,
        backgroundColor: ["#ff6666"],
        borderColor: "#ff6666",
        borderWidth: 1.5,
        radius: 1,
        hitRadius: 20,
        tension: 0.2,
        borderCapStyle: "round",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} style={{"height" : "500px"}} />
    </div>
  );
};

export default Chart;
