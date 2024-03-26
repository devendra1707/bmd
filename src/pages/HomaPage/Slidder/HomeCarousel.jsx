import React from "react";
import AliceCarousel from "react-alice-carousel";
import { homeCarouselData } from "./HomeCarouselData";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import "./CarouselStyles.css";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();
  const item = homeCarouselData.map((item) => (
    <img
      className="cursor-pointer banner"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;
