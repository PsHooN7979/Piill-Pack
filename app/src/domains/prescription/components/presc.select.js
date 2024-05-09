import React, { useState, useEffect } from 'react';
import uis from "../../../constants/ui.constant";
import icons from "../../../constants/icon";
import { useNavigate } from 'react-router-dom';


export default function PrescSelect({ presc }) {
    const [prescList, setPrescList] = useState('');
    const [activeTab, setActiveTab] = useState(-1);
    const navigate = useNavigate();

    const selectList = (e) => {
        setPrescList(e.target.value);
        setActiveTab(e.target.selectedIndex - 1);
    }

    const handleEditPresc = () => {
        const selectPresc = presc[activeTab];
        navigate("/prescription/edit", { state: { selectPresc } });
    }

    const handleDetailPresc = (pill) => {
        navigate("/prescription/detail", { state: { pill } });
    }

    const handleDeletePresc = () => {
        if (activeTab >= 0) {

            const updatedPresc = presc.filter((_, index) => index !== activeTab);

            
            console.log("Deleted: ", presc[activeTab].name);  // 로그 확인
            // 상태를 초기화하거나, 적절한 처리
            setActiveTab(-1);
            setPrescList('');  // 선택 초기화
        }
    }

    return (

        <div>
            {/* 처방전 목록 컨테이너 */}
            <div className="border border-gray-300 w-full rounded-lg">
                <select id="prescList" value={prescList} onChange={selectList}
                    className="w-full border-none rounded-lg py-2"
                >
                    <option value="" disabled>--처방 목록을 선택해 주세요--</option>
                    {presc.map((presc, index) => (
                        <option key={index} value={presc.name} >
                            {presc.name}
                        </option>

                    ))}
                </select>
            </div>
            <p className="mt-2 text-sm">복용 기간: xxxxxxx </p>
            {/* 처방전 목록 컨테이너 종료 */}


            {/*  약 목록 컨테이너 */}

            {activeTab >= 0 && presc[activeTab].pills.map((pill, index) => (
                <div key={index} className="flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50">
                    <div className="flex items-center w-full p-3">
                        {/* 이미지 컨테이너 */}
                        <div className='w-10 h-15'>
                            <img
                                src={pill.image}
                                alt={`${pill.name} 로고`}
                                className="flex-none  overflow-hidden w-full h-full bg-white object-cover"
                            />
                        </div>
                        {/* 텍스트 컨테이너 */}
                        <div className="flex-grow ml-4">
                            <div className="text-lg font-semibold w-64 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {pill.name}
                            </div>
                            <div className="text-xs overflow-hidden">
                                {pill.description}
                            </div>
                            <div className="text-xs overflow-hidden">
                                {pill.chart}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            className="relative flex justify-between items-center w-full py-2 bg-mint02 rounded-b-lg hover:bg-mint01 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={() => handleDetailPresc(pill)}
                        >
                            <div className='flex items-center text-sm text-black font-semibold pl-4'>
                                <span className='ml-1'>약 상세 정보</span>
                            </div>
                            <img src={uis.next} alt="next" className='h-3 pr-4' />

                        </button>

                    </div>
                    <div className="fixed inset-x-0 bottom-20 mx-auto w-full px-10 flex justify-center ">
                        <button className="bg-warn01 rounded-lg text-white p-1 mx-auto hover:bg-warn02 px-2" onClick={handleEditPresc}>
                            <icons.iconTypes.editIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
                            <strong>처방 정보 수정</strong>
                        </button>
                    </div>

                </div>
            ))}

        </div>
    )
}