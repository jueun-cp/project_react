import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);

//// 리펙토링 + 미들웨어 추가 ////
const post = new Router();
post.get('/', postsCtrl.read); // ObjectId 검증이 필요한 부분에 미들웨어 추가
post.delete('/', postsCtrl.remove);    // ObjectId 검증이 필요한 부분에 미들웨어 추가
post.patch('/', postsCtrl.update); // ObjectId 검증이 필요한 부분에 미들웨어 추가

posts.use('/:id', postsCtrl.checkObjectId, post.routes());
//// 리펙토링 + 미들웨어 추가 ////

export default posts;