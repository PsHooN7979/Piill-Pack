import { Provider } from "react-redux";
import Router from "./(route)/Router";
import store from "./common/feature/store";

function App() {
  /**
   * Test Mopheus Api
   * console.log(M.navigator.os());
   */

  return (
    <Provider store={store}>
      <Router />;
    </Provider>
  );
}

export default App;
