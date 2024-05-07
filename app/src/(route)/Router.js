import { Routes, Route, HashRouter } from "react-router-dom";


import Pages from "../domains";

function Router() {
  return (
    /**
     * June. render of routing in SSR refactoring
     * + 개발용으로 바로 홈으로 가도록 임시 라우팅
     */
    <HashRouter>
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/first" element={<Pages.FistLogin />} />
        <Route path="/home" element={<Pages.Home />} />
        <Route path="/scanner" element={<Pages.Scanner />} />
        <Route path="/profile" element={<Pages.MyPage />} />
        <Route path="/profile/edit" element={<Pages.ProfileEditPage />} />
        <Route path="/prescription" element={<Pages.Prescription />} />

      </Routes>
    </HashRouter>
  );
}

export default Router;