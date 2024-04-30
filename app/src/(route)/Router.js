import StartPage from "../domains/start/StartPage";
import UserInfoRegistPage from "../domains/registration/UserInfoRegistPage";

import { Routes, Route, HashRouter } from "react-router-dom";

function AppRouter() {
  return (
    /**
     * June. SSR routing refactoring
     */
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/first" element={<UserInfoRegistPage />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
