import React, { useState, useEffect } from "react";
import uis from "../../../constants/ui.constant";
import icons from "../../../constants/icon";
import { useNavigate } from "react-router-dom";
import images from "../../../constants/image.constant";

import S from "../../_scanner/_organisms/_molecules/efficacies/style";

export default function PrescSelect({ presc }) {
  const [prescList, setPrescList] = useState("");
  const [activeTab, setActiveTab] = useState(null); // 초기값을 null로 설정
  const [nameLimit, setNameLimit] = useState(getNameLimit());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTooltipVisible((prev) => (prev === "" ? "hidden" : "")); // 1초마다 토글
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();

  // 뷰포트의 너비에 따라 nameLimit 값을 결정하는 함수
  function getNameLimit() {
    const width = window.innerWidth;

    if (width <= 280) {
      return 5;
    } else if (width <= 320) {
      return 8;
    } else if (width <= 420) {
      return 10;
    } else if (width <= 450) {
      return 12;
    } else if (width <= 500) {
      return 15;
    } else if (width <= 550) {
      return 18;
    } else {
      return 100;
    }
  }

  // 뷰포트의 너비가 변경될 때마다 nameLimit 값을 업데이트
  useEffect(() => {
    function handleResize() {
      setNameLimit(getNameLimit());
    }

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectList = (name, index) => {
    setPrescList(name);
    setActiveTab(index);
    setDropdownOpen(false);
  };

  const handleEditPresc = () => {
    const selectPresc = presc[activeTab];
    navigate("/prescription/edit", { state: { selectPresc } });
  };

  const handleDetailPresc = (pill) => {
    navigate("/prescription/detail", { state: { pill } });
  };

  const handleAnalyzePresc = (analyze) => {
    navigate("/prescription/analyze", { state: { analyze } });
  };

  const handleDeletePresc = () => {
    if (activeTab !== null && activeTab >= 0) {
      const updatedPresc = presc.filter((_, index) => index !== activeTab);
      console.log("Deleted: ", presc[activeTab].name); // 로그 확인
      // 상태를 초기화하거나, 적절한 처리
      setActiveTab(null); // 초기화
      setPrescList(""); // 선택 초기화
    }
  };
  function formatDateRange(dateString) {
    // 날짜 부분만 추출
    const datePart = dateString.split("-").slice(0, 3).join("-");
    const startDate = new Date(datePart);

    // 유효한 날짜인지 확인
    if (isNaN(startDate.getTime())) {
      throw new Error("Invalid date format");
    }

    // 종료 날짜 생성 (5일 추가)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);

    // 날짜 형식을 "YYYY-MM-DD"로 포맷팅하는 함수
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // 포맷된 날짜 문자열 생성
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    // "YYYY-MM-DD ~ YYYY-MM-DD" 형식으로 반환
    return `${startDateFormatted} ~ ${endDateFormatted}`;
  }

  return (
    <div style={{ marginBottom: "130px" }}>
      {/* 처방전 목록 컨테이너 */}
      <div className="relative border border-gray-300 w-full rounded-lg">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex flex-row justify-between w-full px-3 text-sm border-none rounded-lg py-2 z-10 text-left"
        >
          {prescList || "--처방 목록을 선택해 주세요--"}
          <div
            className={`text-gray-500 transform transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </div>
        </button>
        <div
          className={`absolute top-full left-0 w-full shadow-custom01 bg-white border border-gray-300 rounded-lg z-0 overflow-y-auto transition-all duration-500 ease-in-out transform ${
            dropdownOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          {dropdownOpen &&
            presc.map((prescItem, index) => (
              <button
                key={index}
                onClick={() => selectList(prescItem.name, index)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                {prescItem.name}
              </button>
            ))}
        </div>
      </div>

      {activeTab !== null && presc[activeTab] && (
        <>
          <p className="mt-2 text-sm pb-2">
            <strong>복용 기간</strong>: {formatDateRange(presc[activeTab].name)}
            {" (5일분)"}
          </p>

          <div className="border border-gray-300 w-full rounded-lg px-4 py-2 mb-3 text-gray-500 flex justify-between items-center">
            <strong>{presc[activeTab].name}</strong>
            <button className="flex items-center hover:text-black"></button>
          </div>
          {/* 처방전 목록 컨테이너 종료 */}
          {presc[activeTab].medicineList && (
            <>
              <S.TooltipBox state={tooltipVisible} sx={{ marginLeft: "13%" }}>
                click!
              </S.TooltipBox>
              <div
                className="flex flex-col justify-start items-start border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "50px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
                onClick={() => {
                  handleAnalyzePresc(presc[activeTab]);
                }}
              >
                <img
                  src={images.prescription}
                  style={{ height: "30px" }}
                  alt=""
                />
                필팩 AI 처방전 분석결과 확인하기
              </div>
            </>
          )}
          {/* 약 목록 컨테이너 */}
          {presc[activeTab].medicineList &&
            presc[activeTab].medicineList.map((pill, index) => (
              <div
                key={index}
                className="flex flex-col justify-start items-start border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50"
                style={{
                  background: "white",
                }}
              >
                <div className="flex justify-start items-start m-2">
                  {/* 이미지 컨테이너 */}
                  <div className="">
                    <img
                      src={pill.itemImage || images.no_img}
                      alt={`${pill.name} 로고`}
                      className="flex bg-white object-cover"
                      style={{ height: "60px" }}
                    />
                  </div>
                  {/* 텍스트 컨테이너 */}
                  <div className="flex-grow ml-4">
                    <div className="text-lg font-semibold">
                      {pill.itemName && pill.itemName.length > nameLimit
                        ? `${pill.itemName.substring(0, nameLimit)}...`
                        : pill.itemName}
                    </div>
                    <div className="text-xs overflow-hidden">
                      {"효능: " + pill.effect}
                    </div>
                    <div className="text-xs overflow-hidden">
                      {"보관법: " + pill.storageMethod}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    className="relative flex justify-between items-center w-full py-2 bg-mint02 rounded-b-lg hover:bg-mint01 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => handleDetailPresc(pill)}
                  >
                    <div className="flex items-center text-sm text-black font-semibold pl-4">
                      <span className="ml-1">약 상세 정보</span>
                    </div>
                    <img src={uis.next} alt="next" className="h-3 pr-4" />
                  </button>
                </div>
                <div className="fixed inset-x-0 bottom-20 mx-auto w-full px-10 flex justify-center ">
                  <button
                    className="bg-warn01 rounded-lg text-white p-1 mx-auto hover:bg-warn02 px-2"
                    onClick={handleEditPresc}
                  >
                    <icons.iconTypes.editIcon
                      style={{ ...icons.baseStyle, ...icons.iconSizes.lg }}
                    />
                    <strong>처방 정보 수정</strong>
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
