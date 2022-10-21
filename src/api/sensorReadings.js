import axios from "axios";

const sensorReadings = axios.create({
  baseURL: "http://localhost:3000",
});

const getReadings = async () => {
  const response = await sensorReadings.get("/api/data");
  return response.data;
};

const postReading = async (reading) => {
  console.log(reading);
  const response = await sensorReadings.post("/api/data", reading, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const readings = {
  getReadings,
  postReading,
};

export default readings;
