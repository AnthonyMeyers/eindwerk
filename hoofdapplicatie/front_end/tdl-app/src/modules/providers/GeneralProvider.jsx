import { BrowserRouter as Router } from "react-router-dom";
import store from "../../data/store";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';

let persistor = persistStore(store);

const GeneralProvider = ({children}) => {
  return (
    <>
  <Provider store={store}>
    <persistReducer persistor={persistor}>
    <Router>
      {children}
    </Router>
    </persistReducer>
  </Provider>
    </>
  )
}

export default GeneralProvider