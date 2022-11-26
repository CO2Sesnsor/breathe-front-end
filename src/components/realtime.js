import { supabase } from "../supabase";
import { useEffect } from "react";

const Realtime = () => {
  useEffect(() => {
    supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "data" },
        (payload) => {
          console.log("Change received!", payload.new.co2);
        }
      )
      .subscribe((status) => console.log(`status: ${status}`));

    // taskListener.unsubscribe();
  }, []);
  return <h1>Realtime</h1>;
};

export default Realtime;
