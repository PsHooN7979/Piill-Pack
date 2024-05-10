import PrescHeader from "./components/prescHeader";
import BottomNavigation from "../../common/components/BottomNavigation";
import PrescSelect from "./components/presc.select";
import images from "../../constants/image.constant";
import { useEffect } from "react";
import Title from "../_scanner/_organisms/title/_title";
import constant from "../../constants/constant";

export default function PrescriptionList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 처방전 더미 데이터
  const prescData = [
    {
      name: "처방 1",
      pills: [
        {
          name: "타이레놀8시간이알서방정(아세트아미노펜)",
          chart: "흰색의 장방형 서방성 필름코팅정제",
          image: images.logo,
          description: "해열.진통.소염제",
        },
        {
          name: "가스디알정50밀리그램(디메크로틴산마그네슘)",
          chart: "녹색의 원형 필름코팅정",
          image: images.logo,
          description: "기타의 소화기관용약",
        },
      ],
    },
    {
      name: "처방 2",
      pills: [
        {
          name: "부루펜정200밀리그램(이부프로펜)",
          chart: "흰색의 장방형 필름코팅 정제",
          image: images.logo,
          description: "해열.진통.소염제",
        },
      ],
    },
    {
      name: "처방 3",
      pills: [
        {
          name: "가스모틴정5밀리그램(모사프리드시트르산염수화물)",
          chart: "이약은 분할선을 가진 흰색의 장방형 필름코팅정제이다",
          image: images.logo,
          description: "기타의 소화기관용약",
        },
      ],
    },
  ];

  // 약 목록 더미 데이터

  return (
    <div className="relative">
      <PrescHeader />
      <Title title={constant.Title.prescription} />
      <div className="flex flex-col justify-center items-center">
        <div className=" flex-col bg-opacity-100 mt-6 w-[85%] min-h-screen ">
          {/* 처방전 데이터                    */}
          <PrescSelect presc={prescData} />
        </div>
      </div>
      <BottomNavigation active="2" />{" "}
      {/* 활성화(1: 홈, 2: 처방목록, 3: 건강 상태, 4: 내 정보) */}
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
