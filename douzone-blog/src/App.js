import { Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import PostListPage from './components/PostListPage';
import PostPage from './components/PostPage';
import RegisterPage from './components/RegisterPage';
import WritePage from './components/WritePage';

const App = () => {
  return (
    <>
      <a href="/login">로그인 가기</a><br/>
      <a href="/">홈가기</a><br/>
      <a href="/register">회원가입</a><br/>
      <a href="/write">글쓰기</a><br/>
      <a href="/post">포스트 읽기</a><br/>
      <Route component={PostListPage} path={['/@:username','/']} exact/>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={WritePage} path="/write"/>
      <Route component={PostPage} path={['/@:username/:postId','/post']} exact/>
      {/* 이거 사용하기<Route component={PostPage} path="/@:username/:postId"/> */}

    </>
  );
}
export default App;
