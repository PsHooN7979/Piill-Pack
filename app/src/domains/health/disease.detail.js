import { useLocation } from 'react-router-dom';
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import DiseaseDetailHeader from "./components/disease.detail.header";

export default function DiseaseDetailPage() {
    const location = useLocation();
    const diseaseData = location.state.diseaseData;
    console.log(diseaseData);

    return (
        <div className="relative">
            <DiseaseDetailHeader title="질병 상세 정보" />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[95%] min-h-screen">

                    <div className="mt-5 px-6">
                        {diseaseData.name}
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
