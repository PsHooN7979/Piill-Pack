import React, { useState } from "react";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import BMIVisualBox from "./components/bmi.visual.box";
import DiseaseList from "./components/disease.list";
import HealthPageHeader from "./components/health.page.header";
import WarningBox from "./components/warning.box";
import AddingDiseaseModal from "./components/add.disease.modal";

export default function HealthPage() {

    const [isAddingModalOpen, setAddingModalOpen] = useState(false);

    const openAddingModal = () => {
        setAddingModalOpen(true);
    };

    const closeAddingModal = () => setAddingModalOpen(false);

    // 테스트용 프로필 정보 더미 데이터
    const profileData = {
        profile_image: null,
        nick: "김범준",
        gender: "male",
        age: 25,
        tall: "175",
        weight: "75",
        diseaseList: [
        {
            name: "병 이름1",
        },
        {
            name: "병 이름2",
        },
        {
            name: "병 이름3",
        },
        {
            name: "병 이름4",
        },
        ],
    };
    
    // 주의 질병 리스트 더미데이터
    const diseaseListData = [
        { name: "당뇨", icon: null, desc: "설명..." },
        { name: "심장병", icon: null, desc: "설명..." },
        { name: "고혈압", icon: null, desc: "설명..." },
        { name: "암", icon: null, desc: "설명..." },
        { name: "천식", icon: null, desc: "설명..." }
    ]

    return (
        <div className="relative">
            <div className={`${isAddingModalOpen ? "blur-sm opacity-95" : ""}`}>
                <HealthPageHeader />
                <div className="flex justify-center items-center">
                    <div className="bg-opacity-100 w-[85%] min-h-screen">
                        <div className="font-semibold text-sm my-2">질병 목록</div>
                        <DiseaseList data={profileData} onAddBtnClick={openAddingModal} />
                        <div className="font-semibold text-sm mt-10">현재 BMI(체질량 지수)</div>
                        <div className=" font-semibold text-[0.7rem] text-gray-300 mb-4">BMI가 높으면 심혈관계 질환을 포함한 각종 성인병을 유발 할 수 있음</div>
                        <BMIVisualBox data={profileData} />
                        <div className="font-semibold text-sm mt-10 mb-4">다음과 같은 질병에 조심하세요!</div>
                        <WarningBox diseaseData={diseaseListData} />
                        <div className="mb-20"></div>
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
            
            {/* 모달 컴포넌트를 조건부로 표시 */}
            {isAddingModalOpen && (
                <AddingDiseaseModal
                    onClose={closeAddingModal}
                />
            )}
        </div>
    );
}
