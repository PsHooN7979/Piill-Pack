import images from "../../../../../constants/image.constant";
import S from "./style";

import TestStep from "../testStep/testStep";

export default function Medicines({ medicine, handler, state, count }) {
  return (
    <S.EfficacySection key={count}>
      <S.TitleSection state={state}>
        <S.TitleText delay={count} state={state}>
          {medicine.nameList && medicine.nameList.length} {medicine.title}
        </S.TitleText>
        <S.EfficacyImage
          onClick={() => handler(medicine.efficacy, count)}
          delay={count}
          state={state}
          name={medicine.efficacy}
          src={images[medicine.efficacy]}
        />
        <S.EfficacyText delay={count} state={state} name={medicine.efficacy}>
          {medicine.nameList && "이 약은"} {medicine.ko}
          <TestStep />
        </S.EfficacyText>
      </S.TitleSection>
      <S.NameSection>
        {/* {medicine.nameList.map((name, key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  border: "1px solid black",
                  padding: "6px 9px",
                  margin: "6px",
                  borderRadius: "7px",
                }}
              >
                {name}
              </div>
            ))} */}
      </S.NameSection>
    </S.EfficacySection>
  );
}
