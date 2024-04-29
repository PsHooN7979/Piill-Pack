import StartPage from "../domains/start/StartPage";
import UserInfoRegistrationPage from "../domains/registration/UserInfoRegistrationPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/info-input" element={<UserInfoRegistrationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
