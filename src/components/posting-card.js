import { useState, useEffect, useRef } from "react";
import sensorReadingsAPI from "../api/sensorReadings";
import Nav from "./nav";

const Postingcard = () => {
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

  const co2Ref = useRef();
  const vocRef = useRef();

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
      <div className="flex flex-col gap-5">
        <Nav />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Postingcard;
