import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import MyPageHeader from "./compoents/mypage.header";
import ProfileCard from "./compoents/profile.card";

import base64String from "./image.sample"; // base64 이미지 문자열 샘플


export default function MyPage() {

    // 테스트용 프로필 정보 더미 데이터
    const profileData = {
        // base64 이미지 스트링
        profile_image: base64String,
        nick: "닉네임",
        gender: "male",
        tall: "175",
        weight: "65",
        diseaseList: [
            {
                name: "병 이름1"
            },
            {
                name: "병 이름2"
            },
            {
                name: "병 이름3"
            },
            {
                name: "병 이름4"
            }
        ]
    }

    return (
        <div className="relative">
            <MyPageHeader />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="font-semibold text-sm  my-2">
                        내 프로필
                    </div>
                    <ProfileCard data={profileData} diseasesLimit={25} />
                </div>
            </div>

            <BottomNavigation active="4" />
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
