import PrescHeader from "./components/prescHeader";
import BottomNavigation from "../../common/components/BottomNavigation";
import PrescSelect from "./components/presc.select";
import images from "../../constants/image.constant";
import { useEffect } from "react";
import Title from "../_scanner/_organisms/title/_title";
import constant from "../../constants/constant";
import { useSelector } from "react-redux";

export default function PrescriptionList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 처방전 더미 데이터
  const prescData = [
    {
      name: "종양 치료 처방전",
      pills: [
        {
          name: "가스디알정50밀리그램(디메크로틴산마그네슘)",
          chart: "녹색의 원형 필름코팅정",
          image:
            "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300104", // 실제 이미지 URL
          description: "기타의 소화기관용약",
        },
        {
          name: "페라트라정2.5밀리그램(레트로졸)",
          chart: "어두운 황색의 원형 필름코팅정",
          image:
            "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300107", // 실제 이미지 URL
          description: "항악성종양제",
        },
        {
          name: "졸뎀속붕정(졸피뎀타르타르산염)",
          chart: "흰색의 원형 구강붕해정제",
          image:
            "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300128", // 실제 이미지 URL
          description: "최면진정제",
        },
      ],
    },
  ];

  const data2 = useSelector((state) => state.prescriptions.prescriptions || []);
  console.dir(data2);

  return (
    <div className="relative">
      <PrescHeader />
      <Title title={constant.Title.prescription} />
      <div className="flex flex-col justify-center items-center">
        <div className=" flex-col bg-opacity-100 mt-6 w-[85%] min-h-screen ">
          {/* 처방전 데이터                    */}
          <PrescSelect presc={prescData} nameLimit={12} />
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
