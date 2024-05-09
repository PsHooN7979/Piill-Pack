import uis from "../../../constants/ui.constant";

export default function DiseaseList( { data } ) {

    const handleDiseaseDetail = () => {
        // 질병 상세 정보 보기 로직
    }

    const handleAddBtn = () => {
        // 질병 추가 로직
    }

    return(
        <div className="flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-custom01">
            <div className="w-full">
                {data.diseaseList.map((disease, index) => (
                    <div key={index} className="flex justify-between items-center w-full px-4 py-2 border-b border-gray-200">
                        <div className="text-sm text-gray-700">{disease.name}</div>
                        <button 
                            className="text-gray-400 hover:text-mint03 text-xs"
                            onClick={handleDiseaseDetail}
                        >
                            자세히 보기
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full">
                <button 
                    className="relative flex justify-end items-center w-full py-2 bg-mint01 rounded-b-lg hover:bg-mint02 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleAddBtn}
                >
                    <div className='flex items-center text-sm text-gray-600 pl-4'>
                        <span className='mr-2'>질병 추가</span>
                    </div>
                    <img src={uis.next} alt="next" className='h-3 pr-4'/>
                </button>
            </div>
        </div>
    );
}