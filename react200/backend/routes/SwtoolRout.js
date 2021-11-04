const express = require("express");
const app = express();

//urlencoded => request.body의 데이터를 가져왔을 때 사용가능
//express.json() => json 데이터 사용가능
app.use(express.urlencoded({ extended: true }), express.json());

app.post("/", (req, res, next) => { //?type=list
  let type = req.query.type;
  //console.log(req);
  
  if (type == "list") {
    //Swtool 리스트 조회
    try {
      //Mysql Api 모듈(CRUD)
      let dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출
      req.body.mapper = "SwToolsMapper"; //mybatis xml 파일
      req.body.crud = "select"; //select,insert,update,delete 중 입력
      req.body.mapper_id = "selectSwToolsList";

      app.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbConnect error : " + error);
    }
  }else if(type == 'save'){
    //Swtool 저장
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertSwToolsInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(type == 'modify'){
    //Swtool 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSwToolsInfo';
      
      app.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(type == 'delete'){
    //Swtool 삭제
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteSwToolsInfo';
      app.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }


});

module.exports = app;
