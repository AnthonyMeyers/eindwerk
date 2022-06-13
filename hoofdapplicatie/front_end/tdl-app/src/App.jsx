import "./style/App.scss";

import Routing from "./modules/router";
import RouterHeader from "./modules/RouterHeader";
import RouterNavigation from "./modules/RouterNavigation";



export default function App() {
  return (
    <>
    <RouterHeader/>
    <RouterNavigation/>
      <Routing />
    </>
  );
}
