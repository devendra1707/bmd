import { useEffect } from "react";
import Base from "../components/Base";
import { testApi } from "../services/UserService";

const Home = () => {
  useEffect(() => {
    testApi()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Base>
      <div>
        <h1>This is Home Page</h1>
      </div>
    </Base>
  );
};

export default Home;
