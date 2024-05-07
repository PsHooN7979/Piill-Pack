import CircularProgress from "@mui/material/CircularProgress";

import S from "./progress.style";

export default function Progress() {
  return (
    <S.ProgressContainer>
      <CircularProgress sx={{ color: "lightblue" }} />
    </S.ProgressContainer>
  );
}
