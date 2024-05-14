import { useLocation, useNavigate } from "react-router-dom";
import uis from "../../../constants/ui.constant";
import { useState } from "react";
import icons from '../../../constants/icon';
import PrescAdd from "./presc.add";

export default function PrescEdit() {
    const location = useLocation();
    const { selectPresc } = location.state;
    const [pills, setPills] = useState(selectPresc.pills);
    const navigate = useNavigate();

    const pillData = [
        {
          "header": {
            "resultCode": "00",
            "resultMsg": "NORMAL SERVICE."
          },
          "body": {
            "pageNo": 1,
            "totalCount": 25215,
            "numOfRows": 30,
            "items": [
              {
                "ITEM_SEQ": "200808876",
                "ITEM_NAME": "가스디알정50밀리그램(디메크로틴산마그네슘)",
                "ENTP_SEQ": "19540006",
                "ENTP_NAME": "일동제약(주)",
                "CHART": "녹색의 원형 필름코팅정",
                "ITEM_IMAGE": "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300104",
                "PRINT_FRONT": "IDG",
                "PRINT_BACK": null,
                "DRUG_SHAPE": "원형",
                "COLOR_CLASS1": "연두",
                "COLOR_CLASS2": null,
                "LINE_FRONT": null,
                "LINE_BACK": null,
                "LENG_LONG": "7.6",
                "LENG_SHORT": "7.6",
                "THICK": "3.6",
                "IMG_REGIST_TS": "20100326",
                "CLASS_NO": "02390",
                "CLASS_NAME": "기타의 소화기관용약",
                "ETC_OTC_NAME": "전문의약품",
                "ITEM_PERMIT_DATE": "20080820",
                "FORM_CODE_NAME": "당의정",
                "MARK_CODE_FRONT_ANAL": "",
                "MARK_CODE_BACK_ANAL": "",
                "MARK_CODE_FRONT_IMG": "",
                "MARK_CODE_BACK_IMG": "",
                "ITEM_ENG_NAME": null,
                "CHANGE_DATE": "20130129",
                "MARK_CODE_FRONT": null,
                "MARK_CODE_BACK": null,
                "EDI_CODE": null,
                "BIZRNO": "6828500435"
              },
              {
                "ITEM_SEQ": "200808877",
                "ITEM_NAME": "페라트라정2.5밀리그램(레트로졸)",
                "ENTP_SEQ": "19560004",
                "ENTP_NAME": "(주)유한양행",
                "CHART": "어두운 황색의 원형 필름코팅정",
                "ITEM_IMAGE": "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300107",
                "PRINT_FRONT": "YH",
                "PRINT_BACK": "LT",
                "DRUG_SHAPE": "원형",
                "COLOR_CLASS1": "노랑",
                "COLOR_CLASS2": null,
                "LINE_FRONT": null,
                "LINE_BACK": null,
                "LENG_LONG": "6.1",
                "LENG_SHORT": "6.1",
                "THICK": "3.5",
                "IMG_REGIST_TS": "20100429",
                "CLASS_NO": "04210",
                "CLASS_NAME": "항악성종양제",
                "ETC_OTC_NAME": "전문의약품",
                "ITEM_PERMIT_DATE": "20080820",
                "FORM_CODE_NAME": "필름코팅정",
                "MARK_CODE_FRONT_ANAL": "",
                "MARK_CODE_BACK_ANAL": "",
                "MARK_CODE_FRONT_IMG": "",
                "MARK_CODE_BACK_IMG": "",
                "ITEM_ENG_NAME": null,
                "CHANGE_DATE": "20140130",
                "MARK_CODE_FRONT": null,
                "MARK_CODE_BACK": null,
                "EDI_CODE": null,
                "BIZRNO": "1188100601"
              },
              {
                "ITEM_SEQ": "200808948",
                "ITEM_NAME": "졸뎀속붕정(졸피뎀타르타르산염)",
                "ENTP_SEQ": "20080422",
                "ENTP_NAME": "보령제약(주)",
                "CHART": "흰색의 원형 구강붕해정제",
                "ITEM_IMAGE": "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300128",
                "PRINT_FRONT": null,
                "PRINT_BACK": null,
                "DRUG_SHAPE": "원형",
                "COLOR_CLASS1": "하양",
                "COLOR_CLASS2": null,
                "LINE_FRONT": null,
                "LINE_BACK": null,
                "LENG_LONG": "9",
                "LENG_SHORT": "9",
                "THICK": "4",
                "IMG_REGIST_TS": "20100701",
                "CLASS_NO": "01120",
                "CLASS_NAME": "최면진정제",
                "ETC_OTC_NAME": "전문의약품",
                "ITEM_PERMIT_DATE": "20080825",
                "FORM_CODE_NAME": "정제",
                "MARK_CODE_FRONT_ANAL": "",
                "MARK_CODE_BACK_ANAL": "",
                "MARK_CODE_FRONT_IMG": "",
                "MARK_CODE_BACK_IMG": "",
                "ITEM_ENG_NAME": null,
                "CHANGE_DATE": "20170901",
                "MARK_CODE_FRONT": null,
                "MARK_CODE_BACK": null,
                "EDI_CODE": null,
                "BIZRNO": "1348502031"
              },
            ]
        }
      }
    ]


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
            <PrescAdd pill={pillData} prescName={selectPresc.name}/>
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