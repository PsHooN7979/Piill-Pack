import StartPage from "../domains/start/StartPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
