import axios from "axios";

const sensorReadings = axios.create({
  baseURL: "http://localhost:3000",
});

const getReadings = async () => {
  const response = await sensorReadings.get("/api/data");
  return response.data;
};

const readings = {
  getReadings,
};

export default readings;
