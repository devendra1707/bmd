import { homeCarouselData } from "./HomeCarouselData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import styles from "./CarouselStyles.css";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
import { useState } from "react";

const HomeCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  // const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = images.length;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStepChange = (step) => {
  //   setActiveStep(step);
  // };

  return (
    <>
      <section className="slider">
        {homeCarouselData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img
                  src={slide.image}
                  alt="travel image"
                  height={"450px"}
                  width={"100%"}
                />
              )}
            </div>
          );
        })}
      </section>
      <container className="text-center">
         <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} /> 
        {/* <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        /> */}
      </container>
    </>
  );
};

export default HomeCarousel;
