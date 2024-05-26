import { Routes, Route, HashRouter } from "react-router-dom";

import Pages from "../domains";
import AuthWatcher from "../common/components/auth.watcher";

function Router() {
  return (
    /**
     * June. render of routing in SSR refactoring
     * + 개발용으로 바로 홈으로 가도록 임시 라우팅
     */
    <HashRouter>
      <AuthWatcher />
      <Routes>
        <Route path="/auth" element={<Pages.Auth />} />
        <Route path="/first" element={<Pages.FistLogin />} />
        <Route path="/home" element={<Pages.Home />} />
        <Route path="/scanner" element={<Pages.Scanner />} />
        <Route path="/profile/info" element={<Pages.PatientInfoPage />} />

        {/* 처방 목록 */}
        <Route
          path="/prescription/edit"
          element={<Pages.PrescriptionEditPage />}
        />
        <Route path="/prescription/analyze" element={<Pages.Analyze />} />
        <Route path="/prescription" element={<Pages.Prescription />} />
        <Route
          path="/prescription/detail"
          element={<Pages.PrescriptionDetailPage />}
        />
        <Route
          path="/prescription/add"
          element={<Pages.PrescriptionAddPage />}
        />

        {/* 건강 상태 */}
        <Route path="/health" element={<Pages.HealthPage />} />
        <Route path="/health/add" element={<Pages.DiseaseAddPage />} />
        <Route path="/health/detail" element={<Pages.DiseaseDetailPage />} />

        {/* 내 정보 */}
        <Route path="/profile" element={<Pages.MyPage />} />
        <Route path="/profile/guide" element={<Pages.GuidePage />} />
        <Route path="/profile/terms" element={<Pages.TermsPage />} />
        <Route path="/profile/privacy" element={<Pages.PrivacyPage />} />
        <Route path="/profile/edit" element={<Pages.ProfileEditPage />} />

        <Route path="/" element={<Pages.Auth />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
