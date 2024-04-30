import React, { useState } from 'react';
import GenderSelectBtn from "./components/GenderSelectBtn";
import TopMenu from "./components/TopMenu";

function UserInfoRegistPage() {
    const [nick, setNick] = useState('');
    const [tall, setTall] = useState(null);
    const [weight, setWeight] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const handleNickChange = (event) => {
        setNick(event.target.value);
    };

    const handleTallChange = (event) => {
        setTall(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleDone = () => {
        console.log(selectedGender);
    };

    return(
        <div>
            <TopMenu title="회원 정보 입력" />
            <div className="flex justify-center items-center">
                <div className="bg-white mt-6 w-80 min-h-screen">
                    {/* 입력 필드 */}
                    <div className="mb-3 px-6">
                        <div className="text-sm mb-1 ml-1">닉네임</div>
                        <input
                            type="text"
                            placeholder="닉네임을 입력하세요"
                            onChange={handleNickChange}
                            className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                        />
                        <div className="text-sm mb-1 ml-1">키</div>
                        <input
                            type="number"
                            placeholder="키를 입력하세요(cm)"
                            onChange={handleTallChange}
                            className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                        />
                        <div className="text-sm mb-1 ml-1">몸무게</div>
                        <input
                            type="number"
                            placeholder="몸무게를 입력하세요(kg)"
                            onChange={handleWeightChange}
                            className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                        />
                        <div className="text-sm mb-1 ml-1">성별</div>
                        <GenderSelectBtn onGenderSelect={handleGenderSelect} />

                    </div>
                    {/* 버튼 */}
                    <div className="flex flex-row justify-between">
                        <button
                            onClick={null}
                            className="w-24 py-1 border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
                        >
                            처음으로
                        </button>
                        <button
                            onClick={handleDone}
                            className="w-24 py-1 border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
                        >
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfoRegistPage;