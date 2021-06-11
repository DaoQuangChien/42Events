import { useCallback } from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { SCROLL_DOWN, SCROLL_UP } from "../constants";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(SCROLL_UP);
  const lastYOffset = useRef(window.pageYOffset);
  const onScroll = useCallback(() => {
    const currentYOffset = window.pageYOffset;

    setScrollDirection(
      currentYOffset > lastYOffset.current ? SCROLL_DOWN : SCROLL_UP
    );
    lastYOffset.current = currentYOffset;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return [scrollDirection];
};

export default useScrollDirection;
