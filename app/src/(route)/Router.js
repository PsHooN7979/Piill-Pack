import StartPage from "../domains/start/StartPage";
import LoginPage from "../domains/login/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
