import  Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';


///// 코드 검증을 위한 미들웨어 작성 시작 /////
const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};
///// 코드 검증을 위한 미들웨어 작성 끝 /////



////// 블로그 포스트를 작성하는 API 시작//////
// 데이터 쓰기(write)
export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required()가 있으면 항목
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),  // 문자열로 이루어진 배열
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if(result.error){
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 데이터 조회(list)
export const list = async ctx => {
  // query는 문자열이기 때문에 숫자로 변환해 주어야 한다.
  // 값이 주어지지 않았다면 1을 기본으로 사용한다.

  //// 페이지를 지정하여 조회가능 시작 ////
  const page = parseInt(ctx.query.page || '1', 10);

  if(page < 1) {
    ctx.status = 400;
    return;
  }
  //// 페이지를 지정하여 조회가능 끝 ////

  try{
    const posts = await Post.find()
    .sort({ _id: -1 })  // _id의 값이 1이면 오름차순, -1이면 내림차순으로 설정
    .limit(10)   // 파라미터안에 제한할 숫자를 넣는다.
    .skip((page - 1) * 10)  // 10페이지로 한번에 이동, 페이지를 지정하여 조회
    .lean()   // lean()함수를 이용하여 글자 길이 제한
    .exec();   // exec으로 서버에 쿼리를 요청
    const postCount = await Post.countDocuments().exec();   // 마지막 페이지 알려주는 곳
    ctx.set('Last-Page', Math.ceil(postCount / 10));    // 마지막 페이지 알려주는 곳
    ctx.body = posts.map(post => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,   // 글자길이를 200자로 제한
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 데이터 읽기(read)
/*
  POST /api/posts/:id
*/
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if(!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 데이터 삭제(remove)
/*
  POST /api/posts/:id
*/
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();  // id삭제 함수 사용, 다른걸 지우려면 remove() or findOneAndRemove() 사용
    ctx.status = 204;   // No Connect (성공하기는 했지만 응답할 데이터가 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};


// 데이터 수정(update)
/*
  PATCH /api/posts/:id
  {
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
  }
*/
export const update = async ctx => {
  const { id } = ctx.params;
  // write에서 사용한 schema와 비슷하지만, required()가 없다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if(result.error){
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try{
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,  // 이 값을 설정하면 업데이트된 데이터를 반환한다.
      // false일 때는 업데이트되기 전의 데이터를 반환한다.
    }).exec();
    if(!post) {
      ctx.status = 404;
      return;
    } 
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
////// 블로그 포스트를 작성하는 API 끝//////