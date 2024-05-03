import { useState } from "react";
import BottomNavigation from "./components/BottomNavigation";
import LogoHeader from "./components/LogoHeader";

function PrescPage() {

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        console.log(e.target.value);
    }
    return (
        <div className="relative">
            <LogoHeader />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 mt-6 w-80 min-h-screen">

                    {/* 여기에 페이지에 들어갈 내용을 작성하면 됨 */}

                    <div className="border border-gray-300 w-full rounded-lg">
                        <select id="options" value={selectedValue} onChange={handleChange} className="w-full border-none rounded-lg py-1.5">
                            <option value="1">처방 1</option>
                            <option value="2">처방 2</option>
                            <option value="3">처방 3</option>
                            // 나중에 서버에서 받아온 값을 넣어주면 됨.
                        </select>
                    </div>
                        <p className="mt-2"><strong>복용 기간</strong>:{/* 나중에 서버에서 받아온 약 복용 기간 */ } 2024-xx-xx ~ 2024-xx-xx </p>



                </div>
            </div>

            <BottomNavigation active="2" /> {/* 활성화(1: 홈, 2: 처방목록, 3: 건강 상태, 4: 내 정보) */}
            {/* 배경 */}
            <div className="absolute bottom-0 w-full">
                <div className="relative w-full h-auto bottom-0">
                    <img
                        src="/web/images/wave.png"
                        alt="Background"
                        className="fixed bottom-0 w-full h-60 z-[-1]"
                    />
                </div>
            </div>
        </div>
    )
}

export default PrescPage;