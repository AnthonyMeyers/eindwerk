import { BrowserRouter as Router } from "react-router-dom";
import store from "../../data/store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react'

let persistor = persistStore(store);

const GeneralProvider = ({children}) => {
  return (
    <>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <Router>
      {children}
    </Router>
    </PersistGate>
  </Provider>
    </>
  )
}

export default GeneralProvider