import { gql, useLazyQuery } from "@apollo/client";
import { MyCookie } from "pages/_app";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Style from "styles/subj/prac.module.scss";
import { CostumeData } from "../index";
const GET_QUESTION_SOLUTION = gql`
  query($uid: ID!, $mod: String!, $unit: String!, $subj: Int!) {
    test(uid: $uid, mod: $mod, unit: $unit, subj: $subj) {
      questions
      solutions
    }
  }
`;

export default function Tests() {
  const cookie = useContext(MyCookie);
  const { pList } = useContext(CostumeData);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  const [testme, { loading, data }] = useLazyQuery(GET_QUESTION_SOLUTION);
  const [show, setShow] = useState(false);
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (cookie && mod && !loading)
      testme({
        variables: { mod, unit, subj: parseInt(subj), uid: cookie.uid }
      });
  }, [cookie, mod, subj, pList]);

  useEffect(() => {
    if (data && data.test) setTest(data.test);
  }, [data]);

  const clickHandler = state => {
    if (test) {
      const type = typeof state;
      if (type === "boolean") setShow(!show);
      else if (type === "string")
        window.open(`https://drive.google.com/file/d/${state}/view`, "_blank");
    }
  };

  return (
    <div
      onClick={() => clickHandler(true)}
      className={`${Style.tests} ${show ? Style.show : ""}`}
    >
      {test ? "امتحان" : "اجب للحصول على الامتحان"}
      {test && (
        <>
          <div
            onClick={() => clickHandler(data.test.solutions)}
            className={Style.solutions}
          >
            الحلول
          </div>
          <div
            onClick={() => {
              clickHandler(data.test.questions);
            }}
            className={Style.questions}
          >
            الاسئلة
          </div>
        </>
      )}
    </div>
  );
}
