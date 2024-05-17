const Native = {
  Init: "Init",
  Camera: "Camera",
  Read: "Read",

  CameraOn: true,
  CameraOff: false,

  ReadOn: true,
  ReadOff: false,
};

const Title = {
  loading: {
    before: "필팩AI가 처방전을",
    middle: "분석",
    after: "하고있어요!",
  },
  find: {
    before: "필팩AI가 처방된",
    middle: "의약품",
    after: "을 찾았어요!",
  },
  home: {
    before: "지금 복용중인",
    middle: "약",
    after: "이에요.",
  },
  health: {
    before: "필팩AI가",
    middle: "질병",
    after: "을 예방중이에요.",
  },
  prescription: {
    before: "필팩에 등록된",
    middle: "처방전",
    after: "정보에요.",
  },
  mypage: {
    before: "나의",
    middle: "프로필",
    after: "정보에요.",
  },
  analysis: {
    before: "필팩AI가 위험요소를",
    middle: "예방",
    after: "하고 있어요!",
  },
};

const Phrases = [
  "필팩이 사진 찾는 중",
  "필팩이 사진 분석하는 중",
  "필팩이 처방전 요약하는 중",
  "필팩이 식약처 방문 중",
  "필팩이 정리하는 중",
];

const Phrases2 = [
  "필팩이 의약품 분석 중",
  "필팩이 건강 정보를 비교하는 중",
  "필팩이 약물 오남용 예방 중",
  "필팩이 질병 도출 중",
  "필팩이 처방전 상세정보 적는 중",
];

const efficacySet = [
  {
    efficacy: "painkiller",
    title: "개의 진통제를 찾았어요!",

    ko: "아픔을 억제해요.",
    name: "진통제",
  },
  {
    efficacy: "fever",
    title: "개의 해열제를 찾았어요!",

    ko: "열을 낮춰줘요.",
    name: "해열제",
  },
  {
    efficacy: "biotics",
    title: "개의 항생제를 찾았어요!",

    ko: "병균을 제거해요.",
    name: "항생제",
  },
  {
    efficacy: "inflammatory",
    title: "개의 소염제를 찾았어요!",

    ko: "염증을 제거해요",
    name: "소염제",
  },
  {
    efficacy: "asthmatic",
    title: "개의 천식 치료제를 찾았어요!",

    ko: "천식을 치료해요.",
    name: "천식 치료제",
  },
  {
    efficacy: "hypertensive",
    title: "개의 고혈압 치료제를 찾았어요!",

    ko: "고혈압을 관리해요.",
    name: "고혈압",
  },
  {
    efficacy: "diabetic",
    title: "개의 당뇨 치료제를 찾았어요!",

    ko: "당뇨를 조절해요.",
    name: "당뇨 치료제",
  },
  {
    efficacy: "histamine",
    title: "개의 알레르기 치료제를 찾았어요!",

    ko: "알레르기를 치료해요.",
    name: "알레르기 치료제",
  },
  {
    efficacy: "depressant",
    title: "개의 항우울제를 찾았어요!",

    ko: "정신건강을 개선해요.",
    name: "항우울제",
  },
  {
    efficacy: "antacids",
    title: "개의 위산제를 찾았어요!",

    ko: "위 문제를 해결해요.",
    name: "위산제",
  },
  {
    efficacy: "convulsant",
    title: "개의 항경련제를 찾았어요!",

    ko: "경련을 조절해요.",
    name: "항경련제",
  },
  {
    efficacy: "medicine",
    title: "개의 미분류 의약품이 있어요.",

    ko: "전문의약품이에요.",
    name: "미분류 의약품",
  },
  {
    efficacy: "add",
    title: "직접 의약품 등록",
    ko: "의약품 정보를 입력해주세요.",
  },
];

const constant = { Native, Title, Phrases, efficacySet, Phrases2 };
export default constant;
