import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import BMIVisualBox from "./components/bmi.visual.box";
import DiseaseList from "./components/disease.list";
import HealthPageHeader from "./components/health.page.header";
import WarningBox from "./components/warning.box";

import constant from "../../constants/constant";
import Title from "../_scanner/_organisms/title/_title";

export default function HealthPage() {
  // Redux 스토어에서 사용자 정보를 가져오기
  const { age, gender, weight, height, nickname, diseaseList } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 테스트용 프로필 정보 더미 데이터
  const profileData = {
    profile_image: null,
    nick: nickname,
    age: age,
    gender: gender === true ? "male" : "female",
    tall: height,
    weight: weight,
    diseaseList: diseaseList,
  };

  // 주의 질병 리스트 더미데이터
  const diseaseListData = [
    { name: "당뇨", icon: null, desc: "설명..." },
    { name: "심장병", icon: null, desc: "설명..." },
    { name: "고혈압", icon: null, desc: "설명..." },
    { name: "암", icon: null, desc: "설명..." },
    { name: "천식", icon: null, desc: "설명..." },
  ];

  return (
    <div className="relative">
      <HealthPageHeader />
      <Title title={constant.Title.health} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
          <div className="font-semibold text-sm my-2">질병 목록</div>
          <DiseaseList data={profileData} nameLimit={20} />
          <div className="font-semibold text-sm mt-10">
            현재 BMI(체질량 지수)
          </div>
          <div className=" font-semibold text-[0.7rem] text-gray-300 mb-4">
            BMI가 높으면 심혈관계 질환을 포함한 각종 성인병을 유발 할 수 있음
          </div>
          <BMIVisualBox data={profileData} />
          <div className="font-semibold text-sm mt-10 mb-4">
            {nickname + "님! 다음과 같은 질병에 조심하세요!"}
          </div>
          <WarningBox diseaseData={diseaseListData} />
          <div className="mb-20"></div>
        </div>
      </div>

      <BottomNavigation active="3" />
      {/* 배경 */}
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
