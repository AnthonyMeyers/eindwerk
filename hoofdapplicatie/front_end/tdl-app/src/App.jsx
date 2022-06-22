import "./style/App.scss";

import RouterHeader from "./modules/RouterHeader";
import Routing from "./modules/Routing";

export default function App() {
  return (
    <>
      <RouterHeader />
      <Routing />
    </>
  );
}
