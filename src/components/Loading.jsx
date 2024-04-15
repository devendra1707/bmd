import React from "react";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { Spinner } from "reactstrap";
import "./Loading.css";

const Loading = ({ show }) => {
  return (
    show && (
      <div className="loading-container">
        <div className="loading-spinner">
          {/* <Spinner size="lg" /> */}
          {/* <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> */}
          {/* <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> */}
          {/* <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> */}
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    )
  );
};

export default Loading;
