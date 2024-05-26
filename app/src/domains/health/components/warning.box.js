import React, { useEffect, useState, useRef } from "react";
import images from "../../../constants/image.constant";
import "./Animation.css";

export default function WarningBox({ diseaseData }) {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const boxRefs = useRef([]);

  useEffect(() => {
    // 배열을 섞고 앞에서 3개를 선택
    const shuffleAndPick = () => {
      const shuffled = [...diseaseData].sort(() => 0.5 - Math.random());
      setSelectedDiseases(shuffled.slice(0, 3));
    };

    shuffleAndPick();

    // 컴포넌트가 언마운트될 때 실행될 정리 함수
    return () => {
      setSelectedDiseases([]); // 선택된 질병들을 초기화
    };
  }, [diseaseData]);

  // IntersectionObserver을 이용한 스크롤 애니메이션 사용
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 1.0, // 100% 등장하면 애니메이션
      }
    );

    boxRefs.current = boxRefs.current.slice(0, selectedDiseases.length);

    boxRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      boxRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [selectedDiseases]);

  return (
    <div className="flex justify-around">
      {selectedDiseases.map((disease, index) => (
        <div
          ref={(el) => (boxRefs.current[index] = el)}
          key={disease.name}
          className="flex flex-col items-center justify-center py-3 px-5  rounded-lg shadow-custom01 animation-fade-in"
          style={{ background: "white" }}
        >
          <div className="image-container w-12 h-12 overflow-hidden">
            <img
              src={disease.icon || images.no_img}
              alt={disease.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-2 text-sm font-semibold">{disease.name}</div>
        </div>
      ))}
    </div>
  );
}
