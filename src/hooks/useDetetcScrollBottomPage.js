import { useState, useEffect } from "react";

const useDetetcScrollBottomPage = (threshold = 0) => {
  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold
      ) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return [isBottom];
};

export default useDetetcScrollBottomPage;
