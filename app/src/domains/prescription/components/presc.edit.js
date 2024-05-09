import { useLocation, useNavigate } from "react-router-dom";
import uis from "../../../constants/ui.constant";
import { useState } from "react";
import icons from '../../../constants/icon';

export default function PrescEdit() {
    const location = useLocation();
    const { selectPresc } = location.state;
    console.log(selectPresc);
    const [pills, setPills] = useState(selectPresc.pills);
    const navigate = useNavigate();


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
        <div className="py-5">
            {/* 처방전 이름 컨테이너 */}
            <div className="border border-gray-300 w-full rounded-lg px-4 py-2 mb-3 text-gray-500 flex justify-between items-center">
                <strong>{selectPresc.name}</strong>
                <button className="flex items-center hover:text-black">
                </button>
            </div>
            <p className="mb-3 text-sm"> <strong>복용 기간</strong> : xxxxxxx </p>
            {/* 처방전 이름 컨테이너 종료 */}

            {/* 약 이름 검색 컨테이너 */}

            <div className="flex items-center bg-warn01 rounded-full p-2 mb-3 w-full max-w-md mx-auto shadow-custom01">
                <button>
                    {/* <AiOutlineMenu className="text-gray-600 text-xl" /> */}
                    <icons.iconTypes.menuIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
                    {/* 메뉴 아이콘 */}
                </button>
                <input
                    className="flex-grow ml-2 mr-2 bg-transparent outline-none placeholder-gray-600"
                    type="text"
                    placeholder="약 이름으로 검색하기"
                />
                <button>
                    <icons.iconTypes.searchIcon style={{ ...icons.baseStyle, ...icons.iconSizes.lg }} />
                    {/* 검색 아이콘 */}
                </button>
            </div>
            {/* 약 이름 검색 컨테이너 종료 */}

            {pills.map((pill, index) => (
                <div key={index}>
                    <div className="flex  justify-center items-center border border-gray-400 rounded-lg shadow-custom01 my-2 w-full h-50">



                        {/* 약 정보 컨테이너 시작 */}
                        <div className="flex items-center w-full p-3">
                            {/* 이미지 컨테이너 */}
                            <div className='w-10 h-15'>
                                <img
                                    src={pill.image}
                                    alt={`${pill.name} 로고`}
                                    className="flex-none  overflow-hidden w-full h-full bg-white object-cover"
                                />
                                {/* 약 이미지 */}
                            </div>
                            {/* 텍스트 컨테이너 */}
                            <div className="flex-grow ml-4">
                                <div className="text-lg font-semibold w-64 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {pill.name}
                                    {/* 약 이름 */}
                                </div>
                                <div className="text-xs overflow-hidden">
                                    {pill.description}
                                    {/* 약 효과 */}
                                </div>
                                <div className="text-xs overflow-hidden">
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