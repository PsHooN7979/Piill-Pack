import React, { useEffect, useState } from 'react';
import './BMIVisualBox.css'

export default function BMIVisualBox( {data} ) {
    const [showBMIAnimation, setShowBMIAnimation] = useState(false);
    const [showStateAnimation, setShowStateAnimation] = useState(false);

    const bmiValue = calculateBMI(data.weight, data.tall);
    const resultState = currentState(bmiValue);
    const basalMetabolismValue = calculateMetabolism(data.gender, data.weight, data.tall, data.age);


    useEffect(() => {
        // 첫 번째 애니메이션 활성화
        setShowBMIAnimation(true);

        // 0.3초 후 두 번째 애니메이션 활성화
        const timer = setTimeout(() => {
        setShowStateAnimation(true);
        }, 300);

        // 컴포넌트 언마운트 시 타이머 클리어
        return () => clearTimeout(timer);
    }, []);

    // BMI 계산 함수
    function calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }

    // 기초대사량 계산 함수
    function calculateMetabolism(gender, weight, height, age) {
        let metabolismValue = 0;
        if (gender === "male") {
            metabolismValue = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * age);
        } else {
            metabolismValue = 65.51 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
        }
        return metabolismValue.toFixed(0);
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
            <div className={`flex flex-row items-center opacity-0 w-fit border border-gray-400 rounded-xl shadow-custom01 ${showBMIAnimation ? 'animate-slideAndBounce' : ''}`}>
                <div className="flex justify-center items-center bg-mint02 rounded-xl">
                    <div className="py-2 px-3 font-semibold text-sm">체질량지수</div>
                </div>
                <div className="flex justify-center items-center w-fit">
                    <div className="px-3 font-semibold text-xs"><strong className=" text-lg">{bmiValue}</strong> kg/㎡</div>
                </div>
            </div>

            {/* 현재 상태 박스 */}
            <div className={`flex flex-row items-center opacity-0 w-fit mt-3 border border-gray-400 rounded-xl shadow-custom01 ${showStateAnimation ? 'animate-slideAndBounce' : ''}`}>
                <div className="flex justify-center items-center bg-warn02 rounded-xl">
                    <div className="py-2 px-3 font-semibold text-sm">현재 상태</div>
                </div>
                <div className="flex justify-center items-center w-fit">
                    <div className={`px-3 font-semibold text-sm ${textColorForState(resultState)}`}>{resultState}</div>
                </div>
            </div>

            <div>
                {basalMetabolismValue}
            </div>
        </div>
    )
}