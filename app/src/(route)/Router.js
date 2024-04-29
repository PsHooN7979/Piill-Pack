import StartPage from "../domains/start/StartPage";
import UserInfoRegistrationPage from "../domains/registration/UserInfoRegistrationPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

function AppRouter() {
  return (
    /**
     * June. SSR routing refactoring
     */
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/info-input" element={<UserInfoRegistrationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
