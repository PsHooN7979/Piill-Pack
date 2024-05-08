import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Router from "./(route)/Router";
import store from "./common/feature/store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

function App() {
  /**
   * Test Mopheus Api
   * console.log(M.navigator.os());
   */
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
