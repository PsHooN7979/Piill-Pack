import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, TextField } from "@mui/material";

export default function TestSelect({ onAddMedicine, count }) {
  const [efficacy, setEfficacy] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChangeEfficacy = (event) => {
    setEfficacy(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleAddMedicine = () => {
    if (name && efficacy) {
      onAddMedicine(name, efficacy, count);
      setName("");
      setEfficacy("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="품명"
          id="outlined-size-small"
          placeholder="의약품명을 입력하세요"
          size="small"
          sx={{ m: 1, minWidth: 120 }}
          value={name}
          onChange={handleChangeName}
        />
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
          }}
        >
          <InputLabel id="demo-simple-select-helper-label">
            효능 분류
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={efficacy}
            label="Efficacy"
            onChange={handleChangeEfficacy}
          >
            <MenuItem value="painkiller">진통제</MenuItem>
            <MenuItem value="fever">해열제</MenuItem>
            <MenuItem value="biotics">항생제</MenuItem>
            <MenuItem value="inflammatory">소염제</MenuItem>
            <MenuItem value="asthmatic">천식 치료제</MenuItem>
            <MenuItem value="hypertensive">고혈압 치료제</MenuItem>
            <MenuItem value="diabetic">당뇨 치료제</MenuItem>
            <MenuItem value="histamine">알레르기 치료제</MenuItem>
            <MenuItem value="depressant">항우울제</MenuItem>
            <MenuItem value="antacids">위산제</MenuItem>
            <MenuItem value="convulsant">항경련제</MenuItem>
            <MenuItem value="medicine">미분류 의약품</MenuItem>
          </Select>
          <FormHelperText>
            추가할 의약품의 효능 분류를 선택하세요
          </FormHelperText>
        </FormControl>
      </Box>
      <Button
        sx={{
          display: "flex",
          width: "65%",
          color: "white",
          background: "#7FDAD7",
          fontSize: "17px",
          fontWeight: "bold",
          padding: "17px 10px",
          marginRight: "7px",
        }}
        onClick={handleAddMedicine}
      >
        의약품 저장
      </Button>
    </Box>
  );
}
