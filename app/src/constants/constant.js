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
    state: 1,
    before: "필팩이 처방전을",
    middle: "정리",
    after: "하고있어요!",
  },
  find: {
    state: 2,
    before: "필팩이 처방된",
    middle: "의약품",
    after: "을 찾았어요!",
  },
};

const Phrases = [
  "필팩이 사진 찾는 중",
  "필팩이 사진 분석하는 중",
  "필팩이 처방전 요약하는 중",
  "필팩이 식약처 방문 중",
  "필팩이 정리하는 중",
];

const constant = { Native, Title, Phrases };
export default constant;
