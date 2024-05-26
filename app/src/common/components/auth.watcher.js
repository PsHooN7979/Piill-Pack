import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSnackBar } from "../feature/slices/snackBar.slice";

const AuthWatcher = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // 일시 무력화
    if (!isAuth && !initialLoad) {
      dispatch(
        addSnackBar({
          id: Date.now(),
          message: "로그아웃되어 초기 화면으로 이동합니다.",
        })
      );
      navigate("/auth");
    }

    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [isAuth, initialLoad, dispatch, navigate]);

  return null;
};

export default AuthWatcher;
