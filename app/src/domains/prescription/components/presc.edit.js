import { useLocation, useNavigate } from "react-router-dom";
import uis from "../../../constants/ui.constant";
import { useEffect, useState } from "react";
import icons from '../../../constants/icon';
import PrescAdd from "./presc.add";

export default function PrescEdit() {
    const location = useLocation();
    const { selectPresc } = location.state || {};
    const [pills, setPills] = useState(selectPresc.medicines || []);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectPresc && selectPresc.medicines) {
            setPills(selectPresc.medicines);
        }
    }, [selectPresc]);

    const handleRemove = (index) => {
        // filter 메소드를 사용해 해당 인덱스를 제외한 나머지 약 목록을 설정합니다.
        const newPills = pills.filter((_, idx) => idx !== index);
        setPills(newPills);
    };

    const handleDeletePresc = () => {


        // api를 통해 삭제 처리 요청
        console.log("처방전 삭제: ", selectPresc);

        navigate('/prescription');
    }




    return (
        <div className="py-1">
            {/* 약 이름 검색 컨테이너 */}
            <PrescAdd pill={selectPresc} prescName={selectPresc.name}/>
            {/* 약 이름 검색 컨테이너 종료 */}

            {pills.map((pill, index) => (
                <div key={index}>
                    <div className="flex  justify-center items-center border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50">



                        {/* 약 정보 컨테이너 시작 */}
                        <div className="flex items-center w-full p-3 overflow-hidden">
                            {/* 이미지 컨테이너 */}
                            <div className='flex-none w-10 h-15'>
                                <img
                                    src={pill.image}
                                    alt={`${pill.name} 로고`}
                                    className="w-full h-full bg-white object-cover"
                                />
                                {/* 약 이미지 */}
                            </div>
                            {/* 텍스트 컨테이너 */}
                            <div className="flex-grow min-w-0 mx-4">
                                <div className="text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {pill.name}
                                    {/* 약 이름 */}
                                </div>
                                <div className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {pill.description}
                                    {/* 약 효과 */}
                                </div>
                                <div className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {pill.chart}
                                    {/* 약 생김새 */}
                                </div>
                            </div>
                        </div>

                        {/* 약 정보 컨테이너 종료 */}
                        {/* 약 삭제 컨테이너 시작 */}
                        <div className="pr-3">
                            <button className=" text-xl ml-2 hover:text-red-600 text-warn02 p-1 inline-flex items-center justify-center focus:outline-none  "
                                onClick={() => handleRemove(index)}>
                                <icons.iconTypes.deleteIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
                            </button>
                        </div>
                        {/* 약 삭제 컨테이너 종료 */}


                    </div>
                    <div className="fixed inset-x-0 bottom-20 mx-auto w-full px-10 flex justify-center ">
                        <button className="bg-warn01 rounded-lg text-white p-1 mx-auto hover:bg-warn02 px-2" onClick={handleDeletePresc}>
                            <icons.iconTypes.trashIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
                            <strong>처방전 삭제</strong>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}