import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Router from "./(route)/Router";
import store from "./common/feature/store";

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
