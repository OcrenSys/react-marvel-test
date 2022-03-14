import Router from "./constant/router";
import "./App.css";

const App = (): React.ReactElement => {
  const elements = Router();

  return (
    <div>
      {elements}
    </div>
  );
};

export default App;
