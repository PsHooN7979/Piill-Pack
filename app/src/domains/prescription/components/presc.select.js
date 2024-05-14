import React, { useState, useEffect } from 'react';
import uis from "../../../constants/ui.constant";
import icons from "../../../constants/icon";
import { useNavigate } from 'react-router-dom';

export default function PrescSelect({ presc }) {
    const [prescList, setPrescList] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [nameLimit, setNameLimit] = useState(getNameLimit());
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const navigate = useNavigate();

    // 뷰포트의 너비에 따라 nameLimit 값을 결정하는 함수
    function getNameLimit() {
        const width = window.innerWidth;

        if (width <= 280) {
            return 5;
        } else if (width <= 320) {
            return 8;
        } else if (width <= 420) {
            return 10;
        } else if (width <= 450) {
            return 12;
        } else if (width <= 500) {
            return 15;
        } else if (width <= 550) {
            return 18;
        } else {
            return 100;
        }
    }

    // 뷰포트의 너비가 변경될 때마다 nameLimit 값을 업데이트
    useEffect(() => {
        function handleResize() {
            setNameLimit(getNameLimit());
        }

        window.addEventListener('resize', handleResize);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const selectList = (name, index) => {
        setPrescList(name);
        setActiveTab(index);
        setDropdownOpen(false);
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
            <div className="relative border border-gray-300 w-full rounded-lg">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    className=" flex flex-row justify-between w-full px-3 text-sm border-none rounded-lg py-2 text-left"
                >
                    {prescList || "--처방 목록을 선택해 주세요--"}
                    <div className={`text-gray-500 transform transition-transform duration-250 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}>▼</div>
                </button>
                {dropdownOpen && (
                    <div className="absolute w-full shadow-custom01 bg-white border border-gray-300 rounded-lg z-10 max-h-60 overflow-y-auto">
                        {presc.map((presc, index) => (
                            <button 
                                key={index} 
                                onClick={() => selectList(presc.name, index)} 
                                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                                {presc.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <p className="mt-2 text-sm pb-2"><strong>복용 기간</strong>: xxxxxxx </p>
            
            <div className="border border-gray-300 w-full rounded-lg px-4 py-2 mb-3 text-gray-500 flex justify-between items-center">
                <strong>{presc[activeTab].name}</strong>
                <button className="flex items-center hover:text-black">
                </button>
            </div>
            {/* 처방전 목록 컨테이너 종료 */}


            {/*  약 목록 컨테이너 */}

            {activeTab >= 0 && presc[activeTab].pills.map((pill, index) => (
                <div key={index} className="flex flex-col justify-start items-start border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50">
                    <div className="flex justify-start items-start m-2">
                        {/* 이미지 컨테이너 */}
                        <div className='w-10'>
                            <img
                                src={pill.image}
                                alt={`${pill.name} 로고`}
                                className="flex-none overflow-hidden w-full h-full bg-white object-cover"
                            />
                        </div>
                        {/* 텍스트 컨테이너 */}
                        <div className="flex-grow ml-4">
                            <div className="text-lg font-semibold">
                                {pill.name && pill.name.length > nameLimit
                                ? `${pill.name.substring(0, nameLimit)}...`
                                : pill.name}
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