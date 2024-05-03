import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Router from "./(route)/Router";
import store from "./common/feature/store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  /**
   * Test Mopheus Api
   * console.log(M.navigator.os());
   */

  return (
    <Provider store={store}>
      <QueryClientProvider client={QueryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
