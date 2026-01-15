import { useEffect } from "react";
import api from "../api/axios";

const Home = () => {
  useEffect(() => {
    api.get("/posts")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Frontend connected</h1>;
};

export default Home;
