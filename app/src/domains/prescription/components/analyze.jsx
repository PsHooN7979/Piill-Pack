import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HealthPageHeader from "../../health/components/health.page.header";
import BottomNavigation from "../../../common/components/BottomNavigation";
import constant from "../../../constants/constant";
import images from "../../../constants/image.constant";
import Title from "../../_scanner/_organisms/title/_title";

export default function Analyze() {
  const location = useLocation();
  const analyze = location.state?.analyze || {
    warningList: [],
    dangerList: [],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const title = {
    before: "필팩AI가 처방전",
    middle: "주의사항",
    after: "을 찾았어요!",
  };

  return (
    <div className="relative">
      <HealthPageHeader />
      <Title title={title} />
      <div className="flex justify-center items-center mb-4">
        {" "}
        {/* 여백 조정 */}
        <div className="bg-opacity-100 w-[85%] ">
          <div
            className="font-semibold text-sm my-2"
            style={{ color: "#ffd12a", fontWeight: "bold", fontSize: "17px" }}
          >
            주의사항
          </div>

          <WarningList data={analyze.warningList} nameLimit={20} />
        </div>
      </div>

      <div className="flex justify-center items-center mb-4">
        {" "}
        {/* 여백 조정 */}
        <div className="bg-opacity-100 w-[85%] ">
          <div
            className="font-semibold text-sm my-2"
            style={{ color: "#ff7878", fontWeight: "bold", fontSize: "17px" }}
          >
            경고사항
          </div>
          <DangerList data={analyze.dangerList} nameLimit={20} />
        </div>
      </div>
      <BottomNavigation active="2" />
      <div className="absolute bottom-0 w-full">
        <div className="relative w-full h-auto bottom-0">
          <img
            src={images.wave}
            alt="Background"
            className="fixed bottom-0 w-full h-60 z-[-1]"
          />
        </div>
      </div>
    </div>
  );
}

function WarningList({ data, nameLimit }) {
  const navigate = useNavigate();

  const handleDiseaseDetail = (disease) => {
    navigate("/health/detail", { state: { diseaseData: disease } });
  };

  return (
    <div className="flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-custom01">
      {" "}
      {/* 여백 조정 */}
      <div className="w-full">
        {data.length === 0 ? (
          <div
            className="text-sm text-gray-700 px-4 py-2"
            style={{ fontWeight: "bold" }}
          >
            주의사항이 발견되지 않았어요!
          </div>
        ) : (
          data.map((disease, index) => (
            <div
              key={index}
              className="flex   w-full px-4 py-2 border-b border-gray-200"
              style={{ flexDirection: "column" }}
            >
              <div
                className="text-sm text-gray-700"
                style={{ fontWeight: "bold", marginBottom: "5px" }}
              >
                {disease.targeMedicineName &&
                disease.targeMedicineName.length > nameLimit
                  ? `${disease.targeMedicineName.substring(
                      0,
                      nameLimit - 2
                    )}...`
                  : disease.targeMedicineName}
              </div>
              <div className="text-sm text-gray-700">
                {disease.warningMedicineDescription ||
                  disease.warningPatientDescription ||
                  disease.warningDiseaseDescription}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function DangerList({ data, nameLimit }) {
  const navigate = useNavigate();

  const handleDiseaseDetail = (disease) => {
    navigate("/health/detail", { state: { diseaseData: disease } });
  };

  return (
    <div className="flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-custom01 mb-4">
      {" "}
      {/* 여백 조정 */}
      <div className="w-full">
        {data.length === 0 ? (
          <div
            className="text-sm text-gray-700 px-4 py-2"
            style={{ fontWeight: "bold" }}
          >
            경고 위험이 발견되지 않았어요!
          </div>
        ) : (
          data.map((disease, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full px-4 py-2 border-b border-gray-200"
            >
              <div className="text-sm text-gray-700">
                {disease.targeMedicineName &&
                disease.targeMedicineName.length > nameLimit
                  ? `${disease.targeMedicineName.substring(
                      0,
                      nameLimit - 2
                    )}...`
                  : disease.targeMedicineName}
              </div>
              <button
                className="text-gray-400 hover:text-mint03 text-xs"
                onClick={() => handleDiseaseDetail(disease)}
              >
                자세히 보기
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
