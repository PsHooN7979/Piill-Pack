import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenderSelectBtn from "./components/GenderSelectBtn";
import TopMenu from "./components/TopMenu";
import DynamicInputList from "./components/DynamicInputList";

function UserInfoRegistPage() {
  const [nick, setNick] = useState("");
  const [tall, setTall] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [diseaseList, setDiseaseList] = useState([]);

  const navigate = useNavigate();

  const handleNickChange = (event) => {
    setNick(event.target.value);
  };

  const handleTallChange = (event) => {
    setTall(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleInputsChange = (newInputs) => {
    setDiseaseList(newInputs);
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleDone = () => {
    // 모든 필드가 비어있지 않고, tall과 weight가 숫자인지 검사
    if (
      !nick ||
      !selectedGender ||
      !tall ||
      !weight ||
      isNaN(Number(tall)) ||
      isNaN(Number(weight))
    ) {
      console.log("정보 입력 후 회원가입을 진행해 주세요");
      return;
    }
    // 정보 입력 성공
    console.log("회원 정보 입력이 완료되었습니다");
    console.log(
      "닉네임: " +
        nick +
        ", 키: " +
        tall +
        ", 몸무게: " +
        weight +
        ", 성별: " +
        selectedGender
    );
    console.log("질환 목록 -> " + diseaseList);
    navigate("/"); // 임시로 홈으로 리다이렉트
  };

  return (
    <div className="relative">
      <TopMenu title="회원 정보 입력" />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 mt-6 w-80 min-h-screen">
          {/* 입력 필드 */}
          <div className="mb-3 px-6">
            <div className="text-sm mb-1 ml-1">별명</div>
            <input
              type="text"
              placeholder="별명을 입력하세요"
              onChange={handleNickChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">키</div>
            <input
              type="number"
              placeholder="키를 입력하세요(cm)"
              onChange={handleTallChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">몸무게</div>
            <input
              type="number"
              placeholder="몸무게를 입력하세요(kg)"
              onChange={handleWeightChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">성별</div>
            <GenderSelectBtn onGenderSelect={handleGenderSelect} />
            <div className="text-sm mt-3 mb-1 ml-1">질병 입력</div>
            <DynamicInputList
              onItemsChange={handleInputsChange}
              placeholder="병명을 입력하세요"
            />
          </div>
          {/* 버튼 */}
          <div className="flex flex-row justify-between">
            <button
              onClick={handleHome}
              className="w-24 py-1 font-semibold border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
            >
              처음으로
            </button>
            <button
              onClick={handleDone}
              className="w-24 py-1 font-semibold border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
            >
              완료
            </button>
          </div>
        </div>
      </div>
      {/* 배경 */}
      <div className="absolute bottom-0 w-full">
        <div className="relative w-full h-auto bottom-0">
          <img
            src="/web/images/wave.png"
            alt="Background"
            className="fixed bottom-0 w-full h-60 z-[-1]"
          />
        </div>
      </div>
    </div>
  );
}

export default UserInfoRegistPage;
