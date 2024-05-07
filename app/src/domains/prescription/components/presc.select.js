import React, { useState, useEffect } from 'react';


export default function PrescSelect({ presc }) {
    const [prescList, setPrescList] = useState('');
    const [activeTab, setActiveTab] = useState(-1);


    const selectList = (e) => {
        setPrescList(e.target.value);
        setActiveTab(e.target.selectedIndex -1);
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
            <p className="mt-2">복용 기간: xxxxxxx </p>



            {/*  약 목록 컨테이너 */}

            <div className='w-full max-w-screen-lg mx-auto p-4 '>
            {activeTab >= 0 && presc[activeTab].pills.map((pill, index) => (
                    <div key={index} className='pb-3'>
                        <div className="flex flex-row items-stretch bg-white p-4  rounded-t-xl border-4">
                            <div>
                                <img
                                    src={pill.image}
                                    alt={`${pill.name} 로고`}
                                    className="w-6 mx-2 drop-shadow-custom2"
                                />
                            </div>
                            <div className='flex-col'>
                                <strong className='text-lg text-gray-700 '>{pill.name}</strong>
                                <p className='text-sm text-gray-700'>{pill.description}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-cyan-300 to-blue-200 p-2 rounded-b-xl text-right  justify-between shadow-md ">
                            <a href="#" className="text-sm text-black ">약 상세정보 보기 {'>'}</a>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}