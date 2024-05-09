import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import TagList from "../../common/components/tagList";
import DiseaseAddHeader from "./components/disease.add.header";

export default function DiseaseAddPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { profileData } = location.state || {};
    const initialTags = profileData.diseaseList.map(disease => disease.name);

    const [diseaseList, setDiseaseList] = useState(initialTags);
  
    const handleInputsChange = (newInputs) => {
      setDiseaseList(newInputs);
    };

    const handleDone = () => {
        console.log("질병 추가가 완료되었습니다.");
        console.log("질환 목록 -> " + diseaseList);
        navigate(-1);
      };
    
    return (
        <div className="relative">
        <DiseaseAddHeader title="질병 추가" btnHandler={handleDone} />
        <div className="flex justify-center items-center">
            <div className="bg-opacity-100 w-[95%] min-h-screen">

                <div className="mt-5 px-6">
                    <TagList
                    onItemsChange={handleInputsChange}
                    tagDatas={initialTags}
                    placeholder="병명을 입력하세요"
                    />
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
