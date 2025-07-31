// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll to top whenever pathname changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // this component renders nothing
};

export default ScrollToTop;
