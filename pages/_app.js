import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/style.css";

import { PersistGate } from "redux-persist/integration/react";
// import "../style/style.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "../store/store.js";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const RenderLayout = () => {
    getLayout(<Component {...pageProps} />);
  };

  return (
    <Provider store={store}>
      {/* <AppWrapper> */}
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
      {/* </AppWrapper> */}
    </Provider>
  );
  // return getLayout(
  //   <Provider store={store}>
  //     <AppWrapper>
  //       <Component {...pageProps} />
  //     </AppWrapper>
  //   </Provider>
  // );
}

export default MyApp;
