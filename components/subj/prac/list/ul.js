import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Tests from "./tests";
import { CostumeData } from "../index";
import Style from "styles/subj/prac.module.scss";
import Link from "next/link";

export default function Ul() {
  const router = useRouter();
  const { mod, unit, subj, pindex } = router.query;
  const { pList } = useContext(CostumeData);

  const selectme = () => {
    for (let i = 0; i < pList.length; i++) if (!pList[i].correct) return i;
    return pList.length - 1;
  };

  useEffect(() => {
    router.push(`/${mod}/${unit}/${subj}?pindex=${selectme()}`);
  }, [pList[0].pid]);

  return (
    <>
      {pindex && (
        <>
          <Tests />
          <List />
        </>
      )}
    </>
  );
}

function List() {
  const { pList } = useContext(CostumeData);

  return (
    <ul className={Style.list}>
      {pList.map((e, index) => (
        <Li
          key={index}
          props={{
            correct: e.correct,
            pid: e.pid,
            index
          }}
        />
      ))}
    </ul>
  );
}

function Li({ props }) {
  const { index, correct } = props;
  const router = useRouter();
  const { mod, unit, subj, pindex } = router.query;

  const setClass = () => {
    if (pindex == index) {
      let myclass = `${Style.selected} `;
      myclass += correct
        ? Style.sCorrect
        : correct === false
        ? Style.sInCorrect
        : "";
      return myclass;
    }
    if (correct) return Style.correct;
    if (correct === false) return Style.incorrect;
    return Style.notyet;
  };

  return (
    <Link
      shallow={true}
      scroll={false}
      href={`/${mod}/${unit}/${subj}?pindex=${index}`}
    >
      <li className={`${setClass()} ${Style.pracLi}`}>{index + 1}</li>
    </Link>
  );
}
