import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

import './AuthForm.css';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */
const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type }) => {
  const text = textMap[type];

  return (
    <div className="AuthFormBlock">
      <h3>{text}</h3>
      <form>
        <div>
          <input
            className="StyledInput"
            autoComplete="username"
            name="username"
            placeholder="아이디"
          ></input>
          <input
            className="StyledInput"
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
          ></input>
          {type === 'register' && (
            <input
              className="StyledInput"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
            ></input>
          )}
        </div>
        <Button cyan fullWidth style={{ marginTop: '1rem' }}>
          로그인
        </Button>
      </form>
      <div className="Footer">
        <Link to="">회원가입</Link>
      </div>
    </div>
  );
};

export default AuthForm;
