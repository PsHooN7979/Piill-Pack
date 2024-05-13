const mutateOCRSet = [
  {
    efficacy: "painkiller",
    title: "개의 진통제를 찾았어요!",
    nameList: [
      {
        name: "아세트아미노펜",
        description:
          "아세트아미노펜은 비스테로이드성 진통제로, 주로 두통, 근육통, 감기 증상 및 발열을 완화하는 데 사용됩니다. 과다 복용 시 간 손상의 위험이 있어, 권장 복용량을 준수해야 합니다.",
      },
      {
        name: "이부프로펜",
        description:
          "이부프로펜은 비스테로이드성 항염증제(NSAID)로, 통증과 염증을 감소시키는 데 사용됩니다. 주로 두통, 치통, 근육통 및 관절염과 같은 통증 완화에 효과적이며, 위장 관련 부작용에 주의해야 합니다.",
      },
    ],
    ko: "아픔을 억제해요.",
    name: "진통제",
  },
  {
    efficacy: "fever",
    title: "개의 해열제를 찾았어요!",
    nameList: [
      {
        name: "파라세타몰",
        description:
          "파라세타몰은 해열 및 진통 효과가 있으며, 과다 복용 시 간 손상을 일으킬 수 있습니다.",
      },
      {
        name: "나프록센",
        description:
          "나프록센은 NSAID에 속해 염증과 통증을 줄이는데 사용되며, 위장 문제를 일으킬 수 있습니다.",
      },
      {
        name: "히히 나 해열제",
        description: "일반적인 해열제로, 발열과 간단한 통증 완화에 사용됩니다.",
      },
    ],
    ko: "열을 낮춰줘요.",
    name: "해열제",
  },
  {
    efficacy: "biotics",
    title: "개의 항생제를 찾았어요!",
    nameList: [
      {
        name: "아목시실린",
        description:
          "아목시실린은 광범위한 항생제로 다양한 박테리아 감염에 사용됩니다.",
      },
      {
        name: "클라리스로마이신",
        description:
          "클라리스로마이신은 호흡기 및 피부 감염 치료에 효과적인 매크로라이드 항생제입니다.",
      },
      {
        name: "클라리스로마이신2",
        description:
          "클라리스로마이신은 호흡기 및 피부 감염 치료에 효과적인 매크로라이드 항생제입니다.",
      },
      {
        name: "클라리스로마이신3",
        description:
          "클라리스로마이신은 호흡기 및 피부 감염 치료에 효과적인 매크로라이드 항생제입니다.",
      },
    ],
    ko: "병균을 제거해요.",
    name: "항생제",
  },
  {
    efficacy: "inflammatory",
    title: "개의 소염제를 찾았어요!",
    nameList: [
      {
        name: "디클로페낙",
        description:
          "디클로페낙은 강력한 통증 완화 및 염증 감소 효과가 있는 NSAID입니다.",
      },
      {
        name: "케토프로펜",
        description:
          "케토프로펜은 염증 및 통증을 감소시키는데 사용되며, 피부에 바르는 형태도 있습니다.",
      },
    ],
    ko: "염증을 제거해요",
    name: "소염제",
  },
  {
    efficacy: "asthmatic",
    title: "개의 천식 치료제를 찾았어요!",
    nameList: [
      {
        name: "살부타몰",
        description:
          "살부타몰은 천식 발작 시 사용되는 급성 기관지 확장제입니다.",
      },
      {
        name: "플루티카손",
        description:
          "플루티카손은 천식 및 기타 알레르기성 상태를 조절하는 스테로이드 기반 흡입제입니다.",
      },
    ],
    ko: "천식을 치료해요.",
    name: "천식 치료제",
  },
  {
    efficacy: "hypertensive",
    title: "개의 고혈압 치료제를 찾았어요!",
    nameList: [
      {
        name: "로사르탄",
        description:
          "로사르탄은 고혈압을 치료하는데 사용되며, 심혈관 질환 위험을 감소시킵니다.",
      },
      {
        name: "아텐올롤",
        description:
          "아텐올롤은 고혈압 및 협심증 치료제로, 심박수를 낮추고 혈압을 조절합니다.",
      },
    ],
    ko: "고혈압을 관리해요.",
    name: "고혈압",
  },
  {
    efficacy: "diabetic",
    title: "개의 당뇨 치료제를 찾았어요!",
    nameList: [
      {
        name: "메트포르민",
        description:
          "메트포르민은 제2형 당뇨병 치료에 주로 사용되며, 혈당 수치를 낮추는데 도움을 줍니다.",
      },
      {
        name: "글리메피리드",
        description:
          "글리메피리드는 당뇨병 환자의 혈당 조절을 위해 사용되며, 인슐린 분비를 촉진합니다.",
      },
    ],
    ko: "당뇨를 조절해요.",
    name: "당뇨 치료제",
  },
  {
    efficacy: "histamine",
    title: "개의 알레르기 치료제를 찾았어요!",
    nameList: [
      {
        name: "세티리진",
        description:
          "세티리진은 알레르기 증상을 완화시키는 항히스타민제입니다.",
      },
      {
        name: "로라타딘",
        description:
          "로라타딘은 알레르기 및 꽃가루증에 효과적인 비초조성 항히스타민제입니다.",
      },
    ],
    ko: "알레르기를 치료해요.",
    name: "알레르기 치료제",
  },
  {
    efficacy: "depressant",
    title: "개의 항우울제를 찾았어요!",
    nameList: [
      {
        name: "플루옥세틴",
        description:
          "플루옥세틴은 우울증과 강박장애 치료에 사용되는 SSRI 항우울제입니다.",
      },
      {
        name: "세르트랄린",
        description:
          "세르트랄린은 우울증, 불안 장애, PTSD 등을 치료하는데 사용되는 항우울제입니다.",
      },
    ],
    ko: "정신건강을 개선해요.",
    name: "항우울제",
  },
  {
    efficacy: "antacids",
    title: "개의 위산제를 찾았어요!",
    nameList: [
      {
        name: "오메프라졸",
        description:
          "오메프라졸은 위산 과다를 조절하여 역류성 식도염과 위궤양을 치료합니다.",
      },
      {
        name: "란소프라졸",
        description:
          "란소프라졸은 위산 분비를 억제하여 위와 십이지장 궤양을 치료합니다.",
      },
    ],
    ko: "위 문제를 해결해요.",
    name: "위산제",
  },
  {
    efficacy: "convulsant",
    title: "개의 항경련제를 찾았어요!",
    nameList: [
      {
        name: "발프로산",
        description:
          "발프로산은 간질 및 다양한 종류의 발작 치료에 사용되는 항경련제입니다.",
      },
      {
        name: "카바마제핀",
        description:
          "카바마제핀은 신경통 및 간질 치료에 효과적인 항경련제입니다.",
      },
    ],
    ko: "경련을 조절해요.",
    name: "항경련제",
  },
  {
    efficacy: "medicine",
    title: "개의 미분류 의약품이 있어요.",
    nameList: [
      {
        name: "몰네필린",
        description:
          "몰네필린은 특정 종류의 기침 치료에 사용되는 의약품입니다.",
      },
      {
        name: "티크로리누스",
        description:
          "티크로리누스는 면역 억제제로, 주로 이식 수술 후 거부 반응을 줄이는 데 사용됩니다.",
      },
    ],
    ko: "전문의약품이에요.",
    name: "미분류 의약품",
  },
  {
    efficacy: "add",
    title: "직접 의약품 등록",
    ko: "의약품 정보를 입력해주세요.",
  },
];

const testSet = { mutateOCRSet };
export default testSet;
