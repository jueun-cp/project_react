var express = require('express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log('listening on port ${port}');
})

module.exports = app;
