import { useEffect, useState } from "react";
const VOC = ({ data, time }) => {
  const [lastReading, setLastReading] = useState();
  const [prevReading, setPrevReading] = useState();
  const [percentChange, setPercentChange] = useState();
  const [styles, setStyles] = useState({
    bg: "",
    font: "",
    percentFont: "",
  });

  useEffect(() => {
    if (data.length === 0) return;

    let lastReading = data[data.length - 1]["voc"];
    let prevReading = data[data.length - 2]["voc"];
    setLastReading(lastReading);
    setPrevReading(prevReading);
    let percentChange = (
      ((lastReading - prevReading) / prevReading) *
      100
    ).toFixed(2);
    setPercentChange(percentChange);

    if (lastReading < 1000) {
      setStyles({
        ...styles,
        bg: "bg-green-200",
        font: "text-green-700",
      });
    } else if (lastReading > 1000 && lastReading < 2000) {
      // cardColorCO2 = "bg-orange-200";
      // fontColorCO2 = "text-orange-700";
      setStyles({
        ...styles,
        bg: "bg-orange-200",
        font: "text-orange-700",
      });
    } else if (lastReading > 2000) {
      // cardColorCO2 = "bg-red-200";
      // fontColorCO2 = "text-red-700";
    }
    if (percentChange > 0) {
      setStyles({
        ...styles,
        percentFont: "text-green-700",
      });
    } else if (percentChange < 0) {
      setStyles({
        ...styles,
        percentFont: "text-red-700",
      });
    }
  }, [data]);

  return (
    <>
      <div
        className={` ${styles.bg} ${styles.font} py-5 px-8 rounded-md flex flex-col gap-5 w-96`}
      >
        <div className="flex justify-between">
          <p className="text-lg font-normal font-jakarta">VOC Reading</p>
          <p className="text-lg font-normal font-jakarta">{time}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <p className="text-5xl font-bold font-jakarta">
              {JSON.stringify(lastReading)}
            </p>
            <p className="text-2xl font-normal flex items-end font-jakarta">
              PPM
            </p>
          </div>
          <p
            className={` ${styles.percentFont} text-lg font-normal font-jakarta flex flex-col justify-end`}
          >
            {percentChange}%
          </p>
        </div>
      </div>
    </>
  );
};

export default VOC;
