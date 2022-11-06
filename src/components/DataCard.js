import { useEffect, useState } from "react";

const DataCard = ({ name, data, dataParameter, threshold, time }) => {
  // console.log(threshold);
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

    let lastReading = data[data.length - 1][dataParameter];
    let prevReading = data[data.length - 2][dataParameter];
    setLastReading(lastReading);
    setPrevReading(prevReading);
    let percentChange = (
      ((lastReading - prevReading) / prevReading) *
      100
    ).toFixed(2);
    setPercentChange(percentChange);

    let tempStyles = {
      bg: "",
      font: "",
      percentFont: "",
    };

    if (lastReading < threshold.good) {
      tempStyles.bg = "text-green-200";
      tempStyles.font = "text-green-700";
    } else if (
      lastReading > threshold.good &&
      lastReading < threshold.moderate
    ) {
      tempStyles.bg = "text-orange-200";
      tempStyles.font = "text-orange-700";
    } else if (lastReading > threshold.moderate) {
      tempStyles.bg = "text-red-200";
      tempStyles.font = "text-red-700";
    }
    if (percentChange > 0) {
      tempStyles.percentFont = "text-green-700";
    } else if (percentChange < 0) {
      tempStyles.percentFont = "text-red-700";
    }
    setStyles({
      ...styles,
      bg: tempStyles.bg,
      font: tempStyles.font,
      percentFont: tempStyles.percentFont,
    });
  }, [data]);

  return (
    <>
      <div
        className={` ${styles.bg} ${styles.font} py-5 px-8 rounded-md flex flex-col gap-5 w-96`}
      >
        <div className="flex justify-between">
          <p className="text-lg font-normal font-jakarta">{name} Reading</p>
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

export default DataCard;
