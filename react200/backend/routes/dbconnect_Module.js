const express = require("express");
const app = express();
//const router = express.Router();
const mysql = require("mysql");

//mysql 서버 접속 정보
const pool = mysql.createPool({
  host: "192.168.0.30",
  port: "3307",
  database: "react",
  user: "user",
  password: "1",
});

app.post("/", (req, res) => {
  const mybatisMapper = require("mybatis-mapper");
  let param = req.body;

  //mybatis mapper경로 설정
  //흔히 알고있는 매퍼로드(xml이 있는 디렉토리 주소&파일위치를 입력하여주세요!!!)

  mybatisMapper.createMapper(["./models/" + param.mapper + ".xml"]);
  //let time = new Date();
  //console.log('## '+time+ ' ##');
  //console.log("\n Called Mapper Name  = "+param.mapper);

  let format = { language: "sql", indent: "  " };
  //mysql 쿼리 정보 세팅
  //질의문 형식
  ////첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다
  let query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
  );
  //console.log("\n========= Node Mybatis Query Log Start =========");
  console.log(
    "* mapper namespce : " + param.mapper + "." + param.mapper_id + " *\n"
  );
  console.log(query + "\n");

  pool.getConnection(function (err, connection) {
    connection.query(query, function (error, results) {
      if (error) {
        console.log("db error************* : " + error);
      }
      if (results != undefined) {
        string = JSON.stringify(results);
        let json = JSON.parse(string);
        if (req.body.crud == "select") {
          res.send({ json });
        } else {
          res.send("succ");
        }
      } else {
        res.send("error");
      }
      connection.release();
      console.log("========= Node Mybatis Query Log End =========\n");
    });
  });
});
module.exports = app;
