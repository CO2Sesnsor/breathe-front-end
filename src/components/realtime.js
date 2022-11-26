import { supabase } from "../supabase";
import { useEffect, useReducer } from "react";

const Realtime = () => {
  const handleNewTask = (payload) => {
    console.log("reading......");
  };

  const taskListener = supabase
    .from("data")
    .on("*", (payload) => handleNewTask(payload.new))
    .subscribe();

  useEffect(() => {
    const taskListener = supabase
      .from("data")
      .on("INSERT", (payload) => handleNewTask(payload.new))
      .subscribe();

    return taskListener.unsubscribe();
  }, []);
  return <h1>Realtime</h1>;
};

export default Realtime;
