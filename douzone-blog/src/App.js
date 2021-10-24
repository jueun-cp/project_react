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
