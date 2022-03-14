import SmoothScroll from "smooth-scroll";
import Router from "./constant/router";
import "./App.css";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const elements = Router();

  return (
    <div>
      {elements}
    </div>
  );
};

export default App;
