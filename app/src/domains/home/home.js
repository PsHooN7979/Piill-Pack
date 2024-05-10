import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import AdSlider from "./components/ad.slider";
import HomeHeader from "./components/home.header";
import PillScroll from "./components/pill.scroll";
import constant from "../../constants/constant";
import Title from "../_scanner/_organisms/title/_title";

export default function Home() {
  const navigate = useNavigate();
  // 탭 테스트 데이터
  const tabData = [
    {
      name: "처방1",
      items: [
        {
          label: "페라트라정2.5밀리그램(레트로졸)",
          image: images.logo,
        },
        {
          label: "약 아이템2",
          image: images.logo,
        },
        {
          label: "약 아이템3",
          image: null,
        },
        {
          label: "약 아이템4",
          image: null,
        },
        {
          label: "약 아이템5",
          image: null,
        },
        {
          label: "약 아이템6",
          image: null,
        },
      ],
    },
    {
      name: "처방2",
      items: [
        {
          label: "페라트라정2.5밀리그램(레트로졸)",
          image: null,
        },
        { label: "약 아이템2", image: null },
        { label: "약 아이템3", image: null },
        { label: "약 아이템4", image: null },
      ],
    },
    {
      name: "처방3",
      items: [
        {
          label: "페라트라정2.5밀리그램(레트로졸)",
          image: null,
        },
        { label: "약 아이템1", image: null },
      ],
    },
    {
      name: "처방4",
      items: [{ label: "약 아이템1", image: null }],
    },
    {
      name: "처방5",
      items: [{ label: "약 아이템1", image: null }],
    },
    {
      name: "처방6",
      items: [{ label: "약 아이템1", image: null }],
    },
  ];

  // 슬라이더 테스트 더미 데이터
  const products = [
    {
      name: "상품 이름1",
      image: null,
      desc: "설명",
    },
    {
      name: "상품 이름2",
      image: null,
      desc: "설명",
    },
    {
      name: "상품 이름 길이 테스트 상품 이름 길이 테스트",
      image: null,
      desc: "상품 설명 길이 테스트 상품 설명 길이 테스트 상품 설명 길이 테스트 상품 설명 길이 테스트 상품 설명 길이 테스트 상품 설명 길이 테스트",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    M.onBack(function (e) {
      return navigate("/home");
    });
  });

  return (
    <div className="relative">
      <HomeHeader />
      <Title title={constant.Title.home} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[95%] min-h-screen">
          <PillScroll tabs={tabData} wordLimit={10} />
          <AdSlider products={products} nameLimit={12} descLimit={62} />
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
