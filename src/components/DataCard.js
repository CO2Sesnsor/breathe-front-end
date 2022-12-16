import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
const DataCard = ({ name, current, prev, dataParameter, threshold, unit }) => {
  const [currentReading, setcurrentReading] = useState();
  const [percentChange, setPercentChange] = useState();
  const [styles, setStyles] = useState({
    bg: "",
    font: "",
    percentFont: "",
  });
  useEffect(() => {
    if (current.length === 0) return;
    let currentReading = current.new[dataParameter];
    let prevReading = prev[dataParameter];
    setcurrentReading(currentReading);
    let percentChange = (
      ((currentReading - prevReading) / prevReading) *
      100
    ).toFixed(2);
    setPercentChange(percentChange);

    let tempStyles = {
      bg: "",
      font: "",
      percentFont: "",
    };

    if (currentReading < threshold.good) {
      tempStyles.bg = "bg-green-200";
      tempStyles.font = "text-green-700";
    } else if (
      currentReading >= threshold.good &&
      currentReading < threshold.moderate
    ) {
      tempStyles.bg = "bg-orange-200";
      tempStyles.font = "text-orange-700";
    } else if (currentReading >= threshold.moderate) {
      tempStyles.bg = "bg-red-200";
      tempStyles.font = "text-red-700";
    }
    //mailer code
    // let templateParams = { co2: currentReading };
    // emailjs.send(
    //   "service_hfb6ozr",
    //   "template_3ny9bd8",
    //   templateParams,
    //   "_rrXh9YQhOSypf4lh"
    // );
    //   }
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
  }, [current]);

  return (
    <>
      {
        <div
          className={` ${styles.bg} ${styles.font} py-5 px-8 rounded-lg flex flex-col gap-5 w-96`}
        >
          <div className="flex justify-between">
            <p className="text-lg font-normal font-jakarta">{name} Reading</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <p className="text-5xl font-bold font-jakarta">
                {JSON.stringify(currentReading)}
              </p>
              <p className="text-xl font-normal flex items-end font-jakarta">
                {unit}
              </p>
            </div>
            <p
              className={` ${styles.percentFont} text-lg font-normal font-jakarta flex flex-col justify-end`}
            >
              {percentChange}%
            </p>
          </div>
        </div>
      }
    </>
  );
};

export default DataCard;
