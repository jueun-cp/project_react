import Router from 'koa-router';

const test = new Router();

test.post('/login', ctx => {
  const { id, password } = ctx.request.body;

  if (!id || !password) {
    console.log('id & password empty');

    ctx.status = 401;
    return;
  }

  if (id == 'test' && password == '1234') {
    ctx.status = 200;
    return;
  } else {
    console.log('id & password error');

    ctx.status = 401;
    return;
  }
});

export default test;