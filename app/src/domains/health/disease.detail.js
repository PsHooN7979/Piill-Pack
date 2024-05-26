import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import DiseaseDetailHeader from "./components/disease.detail.header";

export default function DiseaseDetailPage() {
  const location = useLocation();
  const diseaseData = location.state.diseaseData;
  console.log(diseaseData);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="relative">
      <DiseaseDetailHeader title="질병 상세 정보" />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[95%] min-h-screen">
          <div
            className="my-4 mx-2 rounded-lg shadow-custom01"
            style={{ background: "white" }}
          >
            <div
              className=" flex flex-col justify-center items-center p-4 rounded-t-lg"
              style={{ borderBottom: "1px solid #ddd", margin: "10px" }}
            >
              <div className="image-container w-20 h-20 overflow-hidden">
                <img
                  src={images.disease}
                  alt={diseaseData.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* <div className="mt-2 text-sm">{diseaseData.name}</div> */}

              <div className=" font-bold text-shadow-custom02 mt-2 ">
                {diseaseData.name}
              </div>
            </div>

            <div
              className="p-2 text-sm rounded-b-lg bg-white "
              style={{ margin: "15px" }}
            >
              <strong>발병 증상: </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: diseaseData.symptom.replace(/\n/g, "<br />"),
                }}
              />
            </div>
            <div
              className="p-2 text-sm rounded-b-lg bg-white "
              style={{ margin: "15px" }}
            >
              <strong>치료법: </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: diseaseData.treatment.replace(/\n/g, "<br />"),
                }}
              />
            </div>
            <div
              className="p-2 text-sm rounded-b-lg bg-white "
              style={{ margin: "15px" }}
            >
              <strong>예방법: </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: diseaseData.prevention.replace(/\n/g, "<br />"),
                }}
              />
            </div>
            <div
              className="p-2 text-sm rounded-b-lg bg-white "
              style={{ margin: "15px" }}
            >
              <strong>주의사항: </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: diseaseData.precautions.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </div>
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
