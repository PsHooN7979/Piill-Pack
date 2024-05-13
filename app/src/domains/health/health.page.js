import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import BMIVisualBox from "./components/bmi.visual.box";
import DiseaseList from "./components/disease.list";
import HealthPageHeader from "./components/health.page.header";
import WarningBox from "./components/warning.box";

import { useEffect } from "react";
import constant from "../../constants/constant";
import Title from "../_scanner/_organisms/title/_title";

export default function HealthPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 테스트용 프로필 정보 더미 데이터
  const profileData = {
    profile_image: null,
    nick: "김범준",
    gender: "male",
    age: 25,
    tall: "175",
    weight: "75",
    diseaseList: [
      {
        name: "당뇨병",
        icon: null,
        desc: "당뇨병은 신체가 음식을 에너지로 전환하는 방식에 영향을 미치는 만성 건강 질환입니다. 이는 혈액 내 포도당 수치가 상승하는 것이 특징이며, 제대로 관리하지 않으면 심각한 건강 합병증을 유발할 수 있습니다. 당뇨병에는 크게 세 가지 유형이 있습니다.\n\n1형 당뇨병: 이 유형은 신체의 면역체계가 췌장의 인슐린 생성 세포를 공격하고 파괴하는 자가면역 질환입니다. 제1형 당뇨병 환자는 매일 인슐린을 투여해야 합니다.\n제2형 당뇨병: 가장 흔한 형태의 당뇨병입니다. 이는 신체가 인슐린에 대한 저항성을 갖게 되거나 췌장이 충분한 인슐린을 생산할 수 없을 때 발생합니다. 제2형 당뇨병은 생활습관 변화와 약물치료를 통해 관리할 수 있는 경우가 많습니다.\n임신성 당뇨병: 이 유형은 임신 중에 발생하며 일반적으로 출산 후에 사라집니다. 그러나 나중에 제2형 당뇨병이 발생할 위험이 높아질 수 있습니다.",
      },
      {
        name: "병 이름2",
        icon: null,
        desc: "설명...",
      },
      {
        name: "병 이름3",
        icon: null,
        desc: "설명...",
      },
      {
        name: "병 이름4",
        icon: null,
        desc: "설명...",
      },
    ],
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
            다음과 같은 질병에 조심하세요!
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
