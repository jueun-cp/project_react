import React from "react";
import { createAction, handleActions } from "redux-actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

// saga 액션 타입
const SAGA = "SAGA";
const SAGA_SUCCESS = "SAGA_SUCCESS";
const SAGA_FAIL = "SAGA_FAIL";

//saga action 정의
const saga_login = createAction(SAGA, ({ id, password }) => ({
  id,
  password,
}));

// 일반 액션 타입
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const ENTER = "ENTER";

// 일반 액션 정의
const login_success = createAction(LOGIN_SUCCESS);
const login_fail = createAction(LOGIN_FAIL);

const enter = createAction(ENTER, ({ name, value }) => {
  return { name, value };
});

// State 초기값
const initState = {
  id: "",
  password: "",
  msg: "",
};

// saga 제너레이터
function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAIL = `${type}_FAIL`;

  return function* (action) {
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: FAIL,
        payload: error,
        error: true,
      });
    }
  };
}

const login_API = ({ id, password }) =>
  axios.post("/api/test/login", { id, password });

const loginSaga = createRequestSaga(SAGA, login_API);

export function* authSaga() {
  yield takeLatest(SAGA, loginSaga);
}

export const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state) => {
      return {
        ...state,
        msg: "login 성공",
      };
    },
    [LOGIN_FAIL]: (state) => {
      return {
        ...state,
        msg: "login 실패",
      };
    },
    [ENTER]: (state, { payload: { name, value } }) => {
      return {
        ...state,
        [name]: value,
      };
    },
    [SAGA_SUCCESS]: (state) => {
      return {
        ...state,
        msg: "saga 성공",
      };
    },
    [SAGA_FAIL]: (state) => {
      return {
        ...state,
        msg: "saga 실패",
      };
    },
  },
  initState
);

const App = () => {
  const dispatch = useDispatch();
  const { msg, id, password } = useSelector((state) => ({
    id: state.id,
    password: state.password,
    msg: state.msg,
  }));

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/test/login", { id, password })
      .then(() => {
        dispatch(login_success());
      })
      .catch(() => {
        dispatch(login_fail());
      });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(enter({ name, value }));
  };

  const sagaHandler = () => {
    dispatch(saga_login({ id, password }));
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input name="id" placeholder="id" onChange={changeHandler} />
        <input
          name="password"
          placeholder="password"
          onChange={changeHandler}
        />
        <button>로그인</button>
      </form>
      <button onClick={sagaHandler}>Redux-Saga</button>
      <p>{msg}</p>
    </>
  );
};

export default App;