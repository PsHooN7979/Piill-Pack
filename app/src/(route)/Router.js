import { Routes, Route, HashRouter } from "react-router-dom";

import Pages from "../domains";

function Router() {
  return (
    /**
     * June. render of routing in SSR refactoring
     */
    <HashRouter>
      <Routes>
        <Route path="/" element={<Pages.Auth />} />
        <Route path="/first" element={<Pages.FistLogin />} />
        <Route path="/home" element={<Pages.Home />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
