import React from "react";
import PropTypes from "prop-types";

const Spinner = ({
  size = "w-16 h-16",
  color = "border-blue-500",
  speed = "animate-spin",
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className={`border-4 border-t-4 ${color} border-solid rounded-full ${size} ${speed}`}
        style={{ borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  speed: PropTypes.string,
};

export default Spinner;

{
  /* <Spinner size="w-8 h-8" color="border-red-500" />  Small red spinner 
<Spinner size="w-24 h-24" color="border-green-500" speed="animate-pulse" />  Large green spinner with pulsing effect */
}
