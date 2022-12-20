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

const Chart = ({ readings, timeInterval }) => {
  let co2AverageArr = [];
  let vocAverageArr = [];
  let timeAverageArr = [];
  let readingsInOneMin = 40;
  const [co2Values, setCo2Values] = useState([]);
  const [vocValues, setVocValues] = useState([]);
  const [timeValues, setTimeValues] = useState([]);

  function averageEvery(arr, n) {
    // if we have neither an arr, or an n
    // variable we quit here:
    if (!arr || !n) {
      return false;
    }

    // creating an variable by the name of 'groups'
    // using an array-literal:
    let groups = [];

    // while the supplied Array ('arr') still
    // has a non-zero length:
    while (arr.length) {
      // we remove the first elements of that
      // Array from the index of 0 to the
      // index supplied in the variable 'n':
      groups.push(arr.splice(0, n));
    }

    // here we return the Array of averages, created
    // using Array.prototype.map() to iterate over
    // the Arrays held in the groups Array:
    return groups.map(
      // here we use Arrow functions, 'group'
      // is a reference to the current Array-
      // element, the Array from the Array of
      // Arrays over which we're iterating:
      (group) =>
        // here we use Array.prototype.reduce()
        // to sum the values of the Array:
        group.reduce(
          // 'a' : the accumulated value returned
          // from the last iteration;
          // 'b' : the current number of the Array
          // of Numbers over which we're iterating:
          (a, b) => a + b

          // once we find the sum, we then divide that
          // sum by the number of Array-elements to find
          // the average:
        ) / group.length
    );
  }

  useEffect(() => {
    let co2Arr = readings.map((current) => current["co2"]);
    let vocArr = readings.map((current) => current["voc"]);
    let timeArr = readings.map((current) => {
      let currentTimeStamp = new Date(current["created_at"]);
      let hours = currentTimeStamp.getHours();
      let minutes = currentTimeStamp.getMinutes();
      let seconds = currentTimeStamp.getSeconds();
      return `${hours}:${minutes}:${seconds}`;
    });

    if (readings.length >= readingsInOneMin) {
      co2AverageArr = co2Arr.splice(
        0,
        readings.length - (readings.length % readingsInOneMin)
      );
      vocAverageArr = vocArr.splice(
        0,
        readings.length - (readings.length % readingsInOneMin)
      );
      timeAverageArr = timeArr.splice(
        0,
        readings.length - (readings.length % readingsInOneMin)
      );
      timeAverageArr = timeAverageArr.filter(
        (_, i) => i % readingsInOneMin == 0
      );

      co2Arr.unshift(averageEvery(co2AverageArr, readingsInOneMin));
      let tempco2Arr = [].concat(...co2Arr);
      co2Arr = tempco2Arr;

      vocArr.unshift(averageEvery(vocAverageArr, readingsInOneMin));
      let tempVocArr = [].concat(...vocArr);
      vocArr = tempVocArr;

      timeArr.unshift(timeAverageArr);
      let tempTimeArr = [].concat(...timeArr);
      timeArr = tempTimeArr;
      // console.log(`AVG: ${co2AverageArr}`);
      console.log(co2Arr);
      // console.log(averageEvery(co2AverageArr, readingsInOneMin));
    }

    setCo2Values(co2Arr);
    setVocValues(vocArr);
    setTimeValues(timeArr);
  }, [JSON.stringify(readings)]);

  console.log(timeInterval);

  // useEffect(() => {
  //   console.log(readings);
  // }, [co2Values]);

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
        // pointRadius: (ctx) => {
        //   const pointsLength = ctx.chart.data.labels.length - 1;
        //   const pointsArray = [];

        //   for (let i = 0; i <= pointsLength; i++) {
        //     if (i === pointsLength) {
        //       pointsArray.push(3);
        //     } else {
        //       pointsArray.push(0);
        //     }
        //   }
        //   return pointsArray;
        // },
        // pointBackgroundColor: "rgba(255, 99, 132, 1)",
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      PPM: {
        // title: {
        //   text: "PPM",
        //   display: true,
        //   padding: 0,
        //   margin: 0,
        // },
        beginAtZero: true,
        type: "linear",
        position: "right",
      },
    },
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

      <Line data={data} options={options} width={"full"} height={300} />

      {/* <Line width={"600px"} height={"600"} data={data} options={options} /> */}
    </div>
  );
};

export default Chart;
