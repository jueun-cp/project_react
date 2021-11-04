import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SoftwareList = () => {
  const [responseSwtoolList, setResponseSwtoolList] = useState("");
  const [append_SwtoolList, setAppend_SwtoolList] = useState("");

  useEffect(async () => {
    await axios
      .post("/api/Swtool?type=list", {})
      .then((response) => {
        try {
          setResponseSwtoolList(response);
          setAppend_SwtoolList(SwToolListAppend(response));
        } catch (error) {
          alert("작업중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {
        alert("작업중 오류가 발생하였습니다.");
        return false;
      });
  }, []);

  const SwToolListAppend = (param) => {
    let result = [];
    var SwToolList = param.data;

    for (let i = 0; i < SwToolList.json.length; i++) {
      var data = SwToolList.json[i];

      var date = data.reg_date;
      var year = date.substr(0, 4);
      var month = date.substr(4, 2);
      var day = date.substr(6, 2);
      var reg_date = year + "." + month + "." + day;

      result.push(
        <tr class="hidden_type">
          <td>{data.swt_toolname}</td>
          <td>{data.swt_function}</td>
          <td>{reg_date}</td>
          <td>
            <Link
              to={"/AdminSoftwareView/" + data.swt_code}
              className="bt_c1 bt_c2 w50_b"
            >
              수정
            </Link>
            <a href="#n" class="bt_c1 w50_b">
              삭제
            </a>
          </td>
        </tr>
      );
    }
    return result;
  };
  return (
    <section class="sub_wrap">
      <article class="s_cnt mp_pro_li ct1 mp_pro_li_admin">
        <div class="li_top">
          <h2 class="s_tit1">Software Tools 목록</h2>
          <div class="li_top_sch af">
            <Link to={"/AdminSoftwareView/register"} className="sch_bt2 wi_au">
              Tool 등록
            </Link>
          </div>
        </div>

        <div class="list_cont list_cont_admin">
          <table class="table_ty1 ad_tlist">
            <tr>
              <th>툴 이름</th>
              <th>기능</th>
              <th>등록일</th>
              <th>기능</th>
            </tr>
          </table>
          <table class="table_ty2 ad_tlist">{append_SwtoolList}</table>
        </div>
      </article>
    </section>
  );
};

export default SoftwareList;
