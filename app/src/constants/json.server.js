const modifiedData = [
  {
    efficacy: "painkiller",
    title: "개의 진통제를 찾았어요!",
    nameList: [
      {
        name: "졸뎀속붕정(졸피뎀타르타르산염)",
        description:
          "졸뎀속붕정은 최면진정제로, 불면증 치료에 사용됩니다. 흰색의 원형 구강붕해정제입니다.",
      },
    ],
    ko: "아픔을 억제해요.",
    name: "진통제",
  },
  {
    efficacy: "antacids",
    title: "개의 소화기관용 약품을 찾았어요!",
    nameList: [
      {
        name: "가스디알정50밀리그램(디메크로틴산마그네슘)",
        description:
          "가스디알정은 소화불량과 관련된 증상을 완화시키는 데 사용됩니다. 녹색의 원형 필름코팅정입니다.",
      },
    ],
    ko: "소화기관에 효과가 있어요.",
    name: "위산제",
  },
  {
    efficacy: "medicine",
    title: "개의 미분류 의약품이 있어요.",
    nameList: [
      {
        name: "페라트라정2.5밀리그램(레트로졸)",
        description:
          "페라트라정은 항악성종양제로, 다양한 종류의 암 치료에 사용됩니다. 어두운 황색의 원형 필름코팅정입니다.",
      },
    ],
    ko: "전문의약품이에요.",
    name: "미분류 의약품",
  },
  {
    efficacy: "add",
    title: "의약품 직접 저장하기",
    ko: "의약품 정보를 입력해주세요.",
  },
];

// {
//   name: itemName,
//   description:
//     entpNmae + "에서 제조한 " + chart " " + etcOtcName + "으로 " + effect + " 역할을 합니다. ",
// }

let mutateOCRSet = [
  {
    efficacy: "painkiller",
    title: "개의 진통제를 찾았어요!",
    nameList: [],
    ko: "아픔을 억제해요.",
    name: "진통제",
  },
  {
    efficacy: "fever",
    title: "개의 해열제를 찾았어요!",
    nameList: [],
    ko: "열을 낮춰줘요.",
    name: "해열제",
  },
  {
    efficacy: "biotics",
    title: "개의 항생제를 찾았어요!",
    nameList: [],
    ko: "병균을 제거해요.",
    name: "항생제",
  },
  {
    efficacy: "inflammatory",
    title: "개의 소염제를 찾았어요!",
    nameList: [],
    ko: "염증을 제거해요",
    name: "소염제",
  },
  {
    efficacy: "asthmatic",
    title: "개의 천식 치료제를 찾았어요!",
    nameList: [],
    ko: "천식을 치료해요.",
    name: "천식 치료제",
  },
  {
    efficacy: "hypertensive",
    title: "개의 고혈압 치료제를 찾았어요!",
    nameList: [],
    ko: "고혈압을 관리해요.",
    name: "고혈압",
  },
  {
    efficacy: "diabetic",
    title: "개의 당뇨 치료제를 찾았어요!",
    nameList: [],
    ko: "당뇨를 조절해요.",
    name: "당뇨 치료제",
  },
  {
    efficacy: "histamine",
    title: "개의 알레르기 치료제를 찾았어요!",
    nameList: [],
    ko: "알레르기를 치료해요.",
    name: "알레르기 치료제",
  },
  {
    efficacy: "depressant",
    title: "개의 항우울제를 찾았어요!",
    nameList: [],
    ko: "정신건강을 개선해요.",
    name: "항우울제",
  },
  {
    efficacy: "antacids",
    title: "개의 위산제를 찾았어요!",
    nameList: [],
    ko: "위 문제를 해결해요.",
    name: "위산제",
  },
  {
    efficacy: "convulsant",
    title: "개의 항경련제를 찾았어요!",
    nameList: [],
    ko: "경련을 조절해요.",
    name: "항경련제",
  },
  {
    efficacy: "medicine",
    title: "개의 미분류 의약품이 있어요.",
    nameList: [],
    ko: "전문의약품이에요.",
    name: "미분류 의약품",
  },
  {
    efficacy: "add",
    title: "의약품 직접 저장하기",
    ko: "의약품 정보를 입력해주세요.",
  },
];

const mutateAnalysisSet = {
  diseaseList: ["감기", "독감", "천식", "인플루엔자"],
  detailMedicineList: [],
  warningList: [],
  dangerList: [],
};

const testSet = { mutateOCRSet, mutateAnalysisSet, modifiedData };
export default testSet;
