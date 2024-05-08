import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import BMIVisualBox from "./components/bmi.visual.box";
import DiseaseList from "./components/disease.list";
import HealthPageHeader from "./components/health.page.header";

export default function HealthPage() {

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
    
    return (
        <div className="relative">
            <HealthPageHeader />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="font-semibold text-sm my-2">질병 목록</div>
                    <DiseaseList data={profileData} />
                    <div className="font-semibold text-sm mt-8">현재 BMI(체질량 지수)</div>
                    <div className=" font-semibold text-[0.7rem] text-gray-300 mb-2">BMI가 높으면 심혈관계 질환을 포함한 각종 성인병을 유발 할 수 있음</div>
                    <BMIVisualBox data={profileData} />
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
