// ProgressBarAnimation.tsx
import Lottie from "lottie-react";
import React from "react";
import progressBarAnimation from "../assets/loading-animation.json";

const ProgressBarAnimation: React.FC = () => {
  return (
    <div className="w-64 h-64">
      <Lottie
        animationData={progressBarAnimation}
        loop={true} // keep looping
        autoplay={true} // play automatically
      />
    </div>
  );
};

export default ProgressBarAnimation;
