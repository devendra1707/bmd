import { useEffect } from "react";
import Base from "../components/Base";
import { testApi } from "../services/UserService";
// import HomePageSlider from "./HomaPage/HomePageSlider";
import { Container } from "reactstrap";
import HomeCarousel from "./HomaPage/Slidder/HomeCarousel";
import { homeCarouselData } from "./HomaPage/Slidder/HomeCarouselData";

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
      <HomeCarousel slides={homeCarouselData} />
    </Base>
  );
};

export default Home;
