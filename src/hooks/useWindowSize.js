import { useEffect, useState } from "react";
import { DESKTOP_MIN_WIDTH } from "../constants";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isDesktopSize: window.innerWidth >= DESKTOP_MIN_WIDTH,
  });
  const onResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isDesktopSize: window.innerWidth >= DESKTOP_MIN_WIDTH,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return [windowSize];
};

export default useWindowSize;
