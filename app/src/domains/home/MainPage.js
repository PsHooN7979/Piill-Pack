import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";

import LogoHeader from "./components/LogoHeader";
import ScrollableTabs from "./components/ScrollableTabs";

function MainPage() {
  // 탭 테스트 데이터
  const tabData = [
    {
      name: "처방1",
      items: [
        {
          label: "페라트라정2.5밀리그램(레트로졸)",
          image: "/web/images/example/Pill_example01.png",
        },
        {
          label: "약 아이템2",
          image: "/web/images/example/Pill_example01.png",
        },
        {
          label: "약 아이템3",
          image: "/web/images/example/Pill_example01.png",
        },
        {
          label: "약 아이템4",
          image: "/web/images/example/Pill_example01.png",
        },
        {
          label: "약 아이템5",
          image: "/web/images/example/Pill_example01.png",
        },
      ],
    },
    {
      name: "처방2",
      items: [
        {
          label: "페라트라정2.5밀리그램(레트로졸)",
          image: "/web/images/logo.png",
        },
        { label: "약 아이템2", image: "/web/images/logo.png" },
        { label: "약 아이템3", image: "/web/images/logo.png" },
        { label: "약 아이템4", image: "/web/images/logo.png" },
      ],
    },
    {
      name: "처방3",
      items: [{ label: "약 아이템1", image: "/web/images/logo.png" }],
    },
    {
      name: "처방4",
      items: [{ label: "약 아이템1", image: "/web/images/logo.png" }],
    },
    {
      name: "처방5",
      items: [{ label: "약 아이템1", image: "/web/images/logo.png" }],
    },
    {
      name: "처방6",
      items: [{ label: "약 아이템1", image: "/web/images/logo.png" }],
    },
  ];

  return (
    <div className="relative">
      <LogoHeader />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-80 min-h-screen">
          <div className="font-semibold my-2">
            지금 복용중인 <strong className="text-xl text-warn02">약</strong>
            이에요
          </div>
          <ScrollableTabs tabs={tabData} wordLimit={10} />
        </div>
      </div>

      <BottomNavigation active="1" />
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

export default MainPage;
