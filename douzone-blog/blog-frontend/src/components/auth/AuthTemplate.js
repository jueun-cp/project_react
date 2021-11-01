import React from 'react';
import { Link } from 'react-router-dom';

import './AuthTemplate.css';

/**
 * 회원가입 / 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */

const AuthTemplate = ({ children }) => {
  return (
    <div className="AuthTemplateBlock">
      <div className="WhiteBox">
        <div className="logo-area">
          <Link to="/">더존 블로그</Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthTemplate;
