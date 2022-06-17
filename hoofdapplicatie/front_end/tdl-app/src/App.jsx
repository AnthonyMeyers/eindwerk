import "./style/App.scss";


import RouterHeader from "./modules/RouterHeader";
import RouterNavigation from "./modules/RouterNavigation";
import Routing from "./modules/Routing";

export default function App() {
  return (
    <>
    <RouterHeader/>
    <RouterNavigation/>
      <Routing />
    </>
  );
}
