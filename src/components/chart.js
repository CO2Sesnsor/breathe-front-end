import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  zoomPlugin
);

const Chart = ({ readings, timeInterval, averageInterval, maxPoints }) => {
  const [co2Values, setCo2Values] = useState([]);
  const [vocValues, setVocValues] = useState([]);
  const [timeValues, setTimeValues] = useState([]);

  function averageEvery(arr, n) {
    if (!arr || !n) {
      return false;
    }

    let groups = [];

    while (arr.length) {
      groups.push(arr.splice(0, n));
    }

    return groups.map((group) => group.reduce((a, b) => a + b) / group.length);
  }
  const arraySlice = (array) => {
    return array.slice(0, readings.length - (readings.length % maxPoints));
  };

  useEffect(() => {
    const readingsCopy = [...readings];
    while (readingsCopy.length > maxPoints) {
      readingsCopy.shift();
    }

    let co2Arr = readingsCopy.map((current) => current["co2"]);
    let vocArr = readingsCopy.map((current) => current["voc"]);
    let timeArr = readingsCopy.map((current) => {
      let currentTimeStamp = new Date(current["created_at"]);
      let hours = currentTimeStamp.getHours();
      let minutes = currentTimeStamp.getMinutes();
      let seconds = currentTimeStamp.getSeconds();
      return `${hours}:${minutes}:${seconds}`;
    });
    console.log(timeArr);
    if (readings.length > 40) {
      co2Arr = averageEvery(co2Arr, averageInterval);
      vocArr = averageEvery(vocArr, averageInterval);
      timeArr = timeArr.filter(
        (e, i) => i % averageInterval === averageInterval - 1
      );
    }
    console.log(timeArr);

    setCo2Values(co2Arr);
    setVocValues(vocArr);
    setTimeValues(timeArr);
  }, [JSON.stringify(readings), timeInterval]);

  // useEffect(() => {
  //   console.log(readings);
  // }, [co2Values]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.05,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
        },
      },
    },

    scales: {
      PPM: {
        title: {
          text: "CO₂ (PPM)",
          display: true,
          padding: 0,
          margin: 0,
        },
        beginAtZero: true,
        type: "linear",
        position: "right",
      },
      PPB: {
        title: {
          text: "VOC (PPB)",
          display: true,
          padding: 0,
          margin: 0,
        },
        beginAtZero: true,
        type: "linear",
        position: "left",
      },
    },
  };

  const data = {
    labels: timeValues,
    datasets: [
      //CO2 plot
      {
        label: "CO₂",
        data: co2Values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#fda4af",
        borderColor: "#fda4af",
        borderCapStyle: "round",
        tension: 0.4,
        pointRadius: (ctx) => {
          const pointsLength = ctx.chart.data.labels.length - 1;
          const pointsArray = [];

          for (let i = 0; i <= pointsLength; i++) {
            if (i === pointsLength) {
              pointsArray.push(3);
            } else {
              pointsArray.push(0);
            }
          }
          return pointsArray;
        },
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "PPM",
      },
      //VOC PLOT
      {
        label: "VOC",
        data: vocValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderCapStyle: "round",
        tension: 0.4,
        yAxisID: "PPB",
        pointRadius: (ctx) => {
          const pointsLength = ctx.chart.data.labels.length - 1;
          const pointsArray = [];

          for (let i = 0; i <= pointsLength; i++) {
            if (i === pointsLength) {
              pointsArray.push(3);
            } else {
              pointsArray.push(0);
            }
          }
          return pointsArray;
        },
      },
    ],
  };

  return (
    <div className="flex flex-grow items-start justify-center w-full p-0">
      <Line data={data} options={options} width={"full"} height={"300"} />

      {/* <Line width={"600px"} height={"600"} data={data} options={options} /> */}
    </div>
  );
};

export default Chart;
