import { useLocation } from "react-router-dom";
import uis from "../../../constants/ui.constant";
import { useState } from "react";

export default function PrescEdit() {
    const location = useLocation();
    const { selectPresc } = location.state;




    const [pills, setPills] = useState(selectPresc.pills);
    

    const handleRemove = (index) => {
        // filter 메소드를 사용해 해당 인덱스를 제외한 나머지 약 목록을 설정합니다.
        const newPills = pills.filter((_, idx) => idx !== index);
        setPills(newPills);
    };




    return (
        <div className="py-5">

            <div className="border border-gray-300 w-full rounded-lg px-4 py-2 text-gray-500 ">
                <strong>{selectPresc.name}</strong>
            </div>
            <p className="mt-2 text-sm">복용 기간: xxxxxxx </p>

            {pills.map((pill, index) => (


                <div key={index}>

                    <div className="flex  justify-center items-center border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50">


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
                        <div className="pr-3">
                            <button className=" text-xl ml-2 hover:text-red-600 text-warn02 p-1 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => handleRemove(index)}>
                                x
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}