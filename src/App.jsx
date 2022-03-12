import { useState, useEffect } from "react";
import SmoothScroll from "smooth-scroll";

import Navigation from "./components/navigation";
import { Footer } from "./components/footer";
import JsonData from "./data/data.json";

import "./App.css";
import { Outlet } from "react-router-dom";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
   
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation data={landingPageData.Navigation} /> 
      <Outlet />
      <Footer data={landingPageData.Navigation} /> 
    </div> 
  );
};

export default App;
