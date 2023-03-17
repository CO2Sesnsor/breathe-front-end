import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";

const Postingcard = () => {
  const [co2Number, setco2Number] = useState(1);
  const [vocNumber, setVocNumber] = useState(100);
  const [time, setTime] = useState();
  useEffect(() => {
    const myInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clear side-effect when component unmount (componentWillUnmount)
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    const myInterval = setInterval(() => {
      let randCO = Math.floor(Math.random() * 3000);
      let randVOC = Math.floor(Math.random() * 600);

      let readingJSON = {
        co2: randCO,
        voc: randVOC,
      };

      // console.log(`data:${JSON.stringify(readingJSON)}`);
      sensorReadingsAPI.postReading(readingJSON);
      return 0;
    }, 15000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const co2Ref = useRef();
  const vocRef = useRef();

  const plus1 = () => {
    const readingsJSON = {
      co2: co2Number,
      voc: vocNumber,
    };
    sensorReadingsAPI.postReading(readingsJSON);
    setco2Number(co2Number + 1);
    setVocNumber(vocNumber - 1);
  };
  const addReading = () => {
    // sensorReadingsAPI.postReading(inputRef.current.value);
    const readingsJSON = {
      co2: co2Ref.current.value,
      voc: vocRef.current.value,
    };
    console.log(readingsJSON);
    sensorReadingsAPI.postReading(readingsJSON);
    return 0;
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="p-6 border border-solid rounded-md flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-bold">Post data</div>
            <div className="font-bold">{time}</div>
          </div>
          <div className="flex gap-4 whitespace-nowrap items-center">
            <p>CO2 reading:</p>
            <input
              type="text"
              className="shadow appearance-none border rounded h-8 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={co2Ref}
            />
          </div>
          <div className="flex gap-4 whitespace-nowrap items-center">
            <p>VOC reading:</p>
            <input
              type="text"
              className="shadow appearance-none border rounded h-8 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={vocRef}
            />
          </div>
          <button
            className="border rounded bg-blue-400 text-white"
            onClick={addReading}
          >
            POST
          </button>
          <button
            className="border rounded bg-blue-400 text-white"
            onClick={plus1}
          >
            Reading +1
          </button>
        </div>
      </div>
    </>
  );
};

export default Postingcard;
