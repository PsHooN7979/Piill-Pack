
export default function BMIVisualBox( {data} ) {

    const bmiValue = calculateBMI(data.weight, data.tall);
    const resultState = currentState(bmiValue);

    // BMI 계산 함수
    function calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }

    // 현재상태 결과
    function currentState(bmiValue) {
        if (bmiValue < 18.5) {
            return "저체중";
        } else if(bmiValue < 23) {
            return "정상";
        } else if(bmiValue < 25) {
            return "비만전단계";
        } else if(bmiValue < 30) {
            return "1단계 비만";
        } else if(bmiValue < 35) {
            return "2단계 비만";
        } else {
            return "3단계 비만";
        }
    }

    // 상태에 따른 텍스트 색상 클래스 결정
    function textColorForState(state) {
        switch(state) {
            case "저체중":
                return "text-blue-400";
            case "정상":
                return "text-green-500";
            case "비만전단계":
                return "text-yellow-500";
            case "1단계 비만":
                return "text-orange-500";
            case "2단계 비만":
                return "text-red-500";
            case "3단계 비만":
                return "text-red-800";
        }
    }

    return(
        <div>
            {/* 체질량 지수 박스 */}
            <div className="flex flex-row items-center w-fit border border-gray-400 rounded-xl shadow-custom01">
                <div className="flex justify-center items-center bg-mint02 rounded-xl">
                    <div className="py-2 px-3 font-semibold text-sm">체질량지수</div>
                </div>
                <div className="flex justify-center items-center w-fit">
                    <div className="px-3 font-semibold text-xs"><strong className=" text-lg">{bmiValue}</strong> kg/㎡</div>
                </div>
            </div>

            {/* 현재 상태 박스 */}
            <div className="flex flex-row items-center w-fit mt-3 border border-gray-400 rounded-xl shadow-custom01">
                <div className="flex justify-center items-center bg-warn02 rounded-xl">
                    <div className="py-2 px-3 font-semibold text-sm">현재 상태</div>
                </div>
                <div className="flex justify-center items-center w-fit">
                    <div className={`px-3 font-semibold text-sm ${textColorForState(resultState)}`}>{resultState}</div>
                </div>
            </div>
        </div>
    )
}