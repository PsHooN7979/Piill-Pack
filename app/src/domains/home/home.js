import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import AdSlider from "./components/ad.slider";
import HomeHeader from "./components/home.header";
import PillScroll from "./components/pill.scroll";
import constant from "../../constants/constant";
import Title from "../_scanner/_organisms/title/_title";
import { useSelector } from "react-redux";
import S from "../_scanner/_organisms/_molecules/efficacies/style";

export default function Home() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
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
      name: "사랑약국",
      image: null,
      desc: "환자의 치료를 위해 최선을 다하는 사랑약국",
    },
    {
      name: "S척센 정형외과",
      image: null,
      desc: "멈추지 않는 허리 통증 치료 전문 병원!",
    },
    {
      name: "The 리뉴얼 판콜",
      image: null,
      desc: "감기, 독감, 코로나까지 모든 호흡기 질환을 한방에! 새로나온 판콜 리뉴얼. 지금 바로 구매하세요!",
    },
  ];

  const {
    age,
    gender,
    weight,
    height,
    nickname,
    diseaseList,
    prescriptionList,
  } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(token);
    window.scrollTo(0, 0);

    M.onBack(function (e) {
      return navigate("/home");
    });
  }, []);

  const userTitle = {
    before: "" + nickname + "님이 복용중인",
    middle: "약",
    after: "이에요.",
  };

  const userTitle2 = {
    before: "" + nickname + "님의",
    middle: "약",
    after: "을 준비중이에요.",
  };

  return (
    <div className="relative">
      <HomeHeader />
      <Title title={prescriptionList.length === 0 ? userTitle2 : userTitle} />
      <div
        className="flex justify-center items-center"
        style={{ flexDirection: "column" }}
      >
        <div
          className="bg-opacity-100 w-[95%]"
          style={{ marginBottom: "30px" }}
        >
          <PillScroll prescriptionList={prescriptionList} wordLimit={10} />
          {/* <Title title={title} /> */}

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
