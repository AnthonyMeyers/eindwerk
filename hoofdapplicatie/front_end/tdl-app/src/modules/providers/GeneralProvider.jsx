import { BrowserRouter as Router } from "react-router-dom";
import store from "../../data/store";
import { Provider } from "react-redux";

const GeneralProvider = ({children}) => {
  return (
    <>
  <Provider store={store}>
    <Router>
      {children}
    </Router>
  </Provider>
    </>
  )
}

export default GeneralProvider