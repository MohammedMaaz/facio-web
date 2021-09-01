import { useState, useEffect } from "react";

export default function useWindowDim(width?: number, height?: number) {
  const [windowSize, setWindowSize] = useState({
    width,
    height,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
