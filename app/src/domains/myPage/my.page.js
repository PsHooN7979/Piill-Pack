import React from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import MyPageHeader from "./compoents/mypage.header";
import ProfileCard from "./compoents/profile.card";

import base64String from "./image.sample"; // base64 이미지 문자열 샘플

export default function MyPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 테스트용 프로필 정보 더미 데이터
    const profileData = {
        // base64 이미지 스트링
        profile_image: base64String,
        nick: "닉네임",
        age: 26,
        gender: "male",
        tall: "175",
        weight: "65",
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

    const navigateTo = (path) => {
        navigate(path);
    };

    const withdrawalHandler = () => {
        // 회원 탈퇴 로직
        console.log("회원탈퇴 버튼 누름");
    };

    const logOutHandler = () => {
        // 로그 아웃 로직
        console.log("로그아웃 버튼 누름");
    };

    return (
        <div className="relative">
            <MyPageHeader />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="font-semibold text-sm  my-2">내 프로필</div>
                    <ProfileCard data={profileData} diseasesLimit={25} />

                    <div className="mt-6">
                        <div className="font-semibold text-sm mb-2">이용 안내</div>
                        <div className="text-xs text-gray-500 mb-2">
                            <button
                                onClick={() => navigateTo("/profile/guide")}
                                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40 hover:"
                            >
                                이용 안내
                            </button>
                        </div>
                        <hr />
                        <div className="font-semibold text-sm mb-2 mt-4">기타</div>
                        <div className="text-xs text-gray-500 mb-2">
                            <button
                                onClick={() => navigateTo("/profile/terms")}
                                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40"
                            >
                                서비스 이용약관
                            </button>
                            <button
                                onClick={() => navigateTo("/profile/privacy")}
                                className="w-full text-left no-underline hover:underline hover:text-mint03 p-2 hover:bg-gray-100 hover:opacity-40"
                            >
                                개인정보 처리 방침
                            </button>
                            <button
                                onClick={withdrawalHandler}
                                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40"
                            >
                                회원 탈퇴
                            </button>
                            <button
                                onClick={logOutHandler}
                                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
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
