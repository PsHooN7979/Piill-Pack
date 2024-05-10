import { useLocation } from 'react-router-dom';
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
                    <div className='my-4 mx-2 rounded-lg shadow-custom01'>

                        <div className=' flex flex-col justify-center items-center p-4 bg-mint02 rounded-t-lg'>
                            <div className="flex flex-col items-center justify-center py-3 px-5 bg-red-200 rounded-lg shadow-custom01">
                                <div className="image-container w-12 h-12 overflow-hidden">
                                    <img src={diseaseData.icon || images.no_img} alt={diseaseData.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="mt-2 text-sm">{diseaseData.name}</div>
                            </div>
                            <div className=' font-bold text-shadow-custom02 mt-2 '>
                                {diseaseData.name}
                            </div>
                        </div>

                        <div className='p-2 text-sm rounded-b-lg bg-white min-h-[50vh]'>
                            <strong>질병 정보: </strong>
                            <div dangerouslySetInnerHTML={{ __html: diseaseData.desc.replace(/\n/g, '<br />') }} />
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
