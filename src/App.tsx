import Router from "./config/router";
import "./App.css";
import { Suspense } from "react";
import Spinner from "./components/Spinners";

const App = (): React.ReactElement => {
  const elements = Router();

  return <Suspense fallback={<Spinner />}>{elements}</Suspense>;
};

export default App;
