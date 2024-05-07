import PrescHeader from "./components/prescHeader"
import BottomNavigation from "../../common/components/BottomNavigation";
import PrescSelect from "./components/presc.select";
import images from "../../constants/image.constant"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrescriptionList() {


    const navigate = useNavigate();



    // 처방전 더미 데이터
    const prescData = [
        {
            name: '처방 1',
            pills: [
                { name: '타이레놀', description: '두통에 효과적인 진통제', image: images.logo },
            ]
        },
        {
            name: '처방 2',
            pills: [
                { name: '어린이용 부루펜', description: '어린이 발열 감소용', image: images.logo },
            ]
        },
        {
            name: '처방 3',
            pills: [
                { name: '가스모틴', description: '소화불량 개선 제', image: images.logo }
            ]
        }
    ]

    // 약 목록 더미 데이터


    return (
        <div className="relative">
            <PrescHeader />

            <div className="flex flex-col justify-center items-center">
                <div className=" flex-col bg-opacity-100 mt-6 w-[85%] min-h-screen ">

                    {/* 처방전 데이터                    */}
                    <PrescSelect presc={prescData} />
                    
            
                </div>

            </div>

            <BottomNavigation active="2" /> {/* 활성화(1: 홈, 2: 처방목록, 3: 건강 상태, 4: 내 정보) */}
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
    )
}