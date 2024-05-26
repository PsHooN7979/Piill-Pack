import React, { useState } from "react";
import images from "../../../constants/image.constant";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PillScroll({ prescriptionList, wordLimit }) {
  function filterPrescriptions(prescriptionListData) {
    return prescriptionListData.filter(
      (prescription) => prescription.medicineList.length > 0
    );
  }

  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  function formatDateTime(datetimeStr) {
    // 날짜 문자열을 분해하여 각 부분을 추출
    const [year, month, day, hour, minute, second] = datetimeStr.split(/[-:]/);

    // 월(month)과 일(day)을 원하는 형식으로 반환
    return `${parseInt(month)}월 ${parseInt(day)}일`;
  }

  if (prescriptionList.length !== 0)
    return (
      <div className="flex flex-col w-full">
        {/* 탭 컨테이너 */}
        <div className="flex w-full overflow-x-auto scrollbar-hide border-b border-mint01">
          {filterPrescriptions(prescriptionList).map(
            (tab, index) =>
              tab.medicineList.length !== 0 && (
                <button
                  key={index}
                  className={`relative text-sm whitespace-nowrap py-4 px-4 flex items-center justify-center ${
                    index === activeTab
                      ? " bg-gray-200 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {formatDateTime(tab.name)}
                  {index === activeTab && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 rounded-t-xl bg-mint02"></span>
                  )}
                </button>
              )
          )}
        </div>

        {/* 아이템 컨테이너 */}
        <div className="overflow-x-auto py-6 bg-gray-100">
          <div className="flex space-x-4 pl-2">
            {filterPrescriptions(prescriptionList)[activeTab].medicineList.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-max"
                >
                  <img
                    src={item.itemImage || images.no_img}
                    alt={item.itemName}
                    className="h-16 px-3"
                  />
                  <div className="text-xs mt-1">
                    {item.itemName && item.itemName.length > wordLimit
                      ? `${item.itemName.substring(0, wordLimit)}...`
                      : item.itemName}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      {/* 탭 컨테이너 */}
      <div className="flex w-full overflow-x-auto scrollbar-hide border-b border-mint01"></div>

      {/* 아이템 컨테이너 */}
      <div
        className="overflow-x-auto py-6 bg-gray-100"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex space-x-4 pl-2">
          <Button
            variant="contained"
            sx={{ background: "#ffd4d4", fontWeight: "bold" }}
            onClick={() => {
              navigate("/scanner");
            }}
          >
            처방전 등록 바로가기
          </Button>
        </div>
      </div>
    </div>
  );
}
