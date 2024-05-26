import { useDispatch, useSelector } from "react-redux";
import S from "../_scanner/style";
import O from "../_scanner/_organisms/organism.index";

import React from "react";
import { useMutation } from "@tanstack/react-query";

import { Box, Button, Paper, styled } from "@mui/material";
import images from "../../constants/image.constant";
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import { useNavigate } from "react-router-dom";

export default function PatientInfoPage() {
  const {
    image,
    nickname,
    age,
    gender,
    height,
    weight,
    diseaseList,
    prescriptionList,
  } = useSelector((state) => state.user);

  const userTitle = {
    before: nickname + "님의",
    middle: "의료기록",
    after: "양식을 작성했어요.",
  };

  const userTitle2 = {
    before: nickname + "님의",
    middle: "의료기록",
    after: "양식이에요.",
  };

  return (
    <S.Container>
      <O.Header />
      <O.Title title={userTitle} />
      <Content
        data={{
          image,
          nickname,
          age,
          gender,
          height,
          weight,
          diseaseList,
          prescriptionList,
        }}
      />
    </S.Container>
  );
}

function Content({ data }) {
  const navigate = useCustomNavigate();
  const navigate2 = useNavigate();
  const {
    image,
    nickname,
    age,
    gender,
    height,
    weight,
    diseaseList,
    prescriptionList,
  } = data;

  const dispatch = useDispatch();

  const [isDetail, setIsDetail] = React.useState(false);
  const [medicines, setMedicines] = React.useState([]);

  return (
    <AnalysisSection>
      <AnalysisPaper elevation={3} state={true} loading={false}>
        <ShowSection>
          <TitleSection>
            <MedicineImage src={images.prescription} />
            <SequentialText text={"의료기록 보고서"} />
          </TitleSection>
          <div
            className=" flex flex-col justify-center items-center p-4 rounded-t-lg"
            style={{ borderBottom: "1px solid #ddd", margin: "10px" }}
          >
            <div className="image-container w-20 h-20 overflow-hidden">
              <img
                src={image}
                alt={""}
                className="w-full h-full object-contain"
              />
            </div>
            {/* <div className="mt-2 text-sm">{diseaseData.name}</div> */}

            <div className=" font-bold text-shadow-custom02 mt-2 ">
              {nickname}
            </div>
          </div>

          <div
            className=" text-sm rounded-b-lg bg-white "
            style={{ margin: "15px" }}
          >
            <strong>{"나이: " + age}</strong>
          </div>
          <div
            className=" text-sm rounded-b-lg bg-white "
            style={{ margin: "15px" }}
          >
            <strong>{"신장: " + height}</strong>
          </div>
          <div
            className=" text-sm rounded-b-lg bg-white "
            style={{ margin: "15px" }}
          >
            <strong>{"체중: " + weight}</strong>
          </div>
          <div
            className=" text-sm rounded-b-lg bg-white "
            style={{ margin: "15px", display: "flex" }}
          >
            <strong>보유 질병: &nbsp;</strong>
            {diseaseList?.length > 0 ? (
              diseaseList.map((disease) => (
                <div key={disease.id}>{disease.name}&nbsp;</div>
              ))
            ) : (
              <div>없음</div>
            )}
          </div>
          <div
            className=" text-sm rounded-b-lg bg-white "
            style={{ margin: "15px", display: "flex", flexDirection: "column" }}
          >
            <strong style={{ marginBottom: "5px" }}>
              복용중인 의약품: &nbsp;
            </strong>
            {prescriptionList?.length > 0 ? (
              prescriptionList.map((prescription) =>
                prescription.medicineList?.length > 0 ? (
                  prescription.medicineList.map((medicine) => (
                    <div
                      style={{ marginLeft: "10px", marginBottom: "3px" }}
                      key={medicine.id}
                    >
                      {medicine.itemName}&nbsp;
                    </div>
                  ))
                ) : (
                  <div>없음</div>
                )
              )
            ) : (
              <div>없음</div>
            )}
          </div>
        </ShowSection>
        <SelectSection isDetail={isDetail}>
          <SaveButton
            onClick={() => {
              navigate2("/profile");
            }}
          >
            기록 저장하기
          </SaveButton>
          <DetailButton
            onClick={() => {
              navigate2("/profile");
            }}
          >
            삭제하기
          </DetailButton>
        </SelectSection>
      </AnalysisPaper>
    </AnalysisSection>
  );
}

const AnalysisSection = styled(Box)({
  display: "flex",
  width: "100%",
  height: "80%",
  justifyContent: "center",
  alignItems: "center",
});
const AnalysisPaper = styled(({ state, loading, ...otherProps }) => (
  <Paper {...otherProps} />
))(({ state, loading }) => ({
  display: state ? "flex" : "none",
  flexDirection: "column",
  justifyContent: loading ? "center" : "space-between",
  alignItems: loading ? "center" : "",
  width: "90%",
  height: "100%",
  borderRadius: "15px",
  overflow: loading ? "" : "scroll",
  scrollbarWidth: loading ? "" : "none",
  msOverflowStyle: loading ? "" : "none",
  "&::-webkit-scrollbar": {
    display: loading ? "" : "none",
  },
}));
const ShowSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "120%",
});
const TitleSection = styled(Box)({
  display: "flex",
  height: "50px",
  padding: "15px",
  marginBottom: "5px",
  position: "sticky",
  top: 0,
  background: "white",
  zIndex: 1,
});
const MedicineImage = styled("img")({
  height: "30px",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s 0s forwards`,
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
});
const MedicineText = styled("span")(({ delay }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay}s forwards`,
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));
function SequentialText({ text }) {
  const letters = text.split("").map((char, index) => (
    <MedicineText key={index} delay={index * 0.02}>
      {char === " " ? "\u00A0" : char}
    </MedicineText>
  ));

  return <div>{letters}</div>;
}
const SelectSection = styled(Box)(({ isDetail }) => ({
  display: isDetail ? "none" : "flex",
  justifyContent: "center",
  padding: "20px 0px",
  background: "white",
  position: "sticky",
  bottom: 0,
}));
const SaveButton = styled(Button)({
  display: "flex",
  width: "65%",
  color: "white",
  background: "#7FDAD7",
  fontSize: "17px",
  fontWeight: "bold",
  padding: "17px 10px",
  marginRight: "7px",
});
const DetailButton = styled(Button)({
  display: "flex",
  color: "white",
  background: "#E8A1A0",
  fontSize: "17px",
  fontWeight: "bold",
  padding: "17px 10px",
});
const AnalysisTitle = styled(Box)({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "30%",
});
const LoadingImage = styled("img")({
  width: "250px",
});
