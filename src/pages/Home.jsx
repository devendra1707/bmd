import { useEffect } from "react";
import Base from "../components/Base";
import { testApi } from "../services/UserService";
import HomePageSlider from "./HomaPage/HomePageSlider";
import { Container } from "reactstrap";

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
  return <Base>{/* <HomePageSlider /> */}</Base>;
};

export default Home;
