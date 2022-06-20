import { useEffect, useState, createContext } from "react";
import Style from "styles/subj/prac.module.scss";
import Interface from "./interface";
import PracList from "./list";
import { useRouter } from "next/router";
export const CostumeData = createContext();

export default function Prac() {
  const [result, setResult] = useState(undefined);
  const [pList, setPList] = useState([]);
  const [expectedLength, setExpectedLength] = useState(1);
  const router = useRouter();
  const { pindex } = router.query;
  useEffect(() => {
    if (result && result.result !== pList[parseInt(pindex)].correct) {
      setPList(arr => {
        let myArr = [];
        arr.map((e, i) => {
          let obj = {
            pid: e.pid
          };
          obj.correct = i == pindex ? result.result : e.correct;
          myArr.push(obj);
        });
        return myArr;
      });
    }
  }, [result]);
  return (
    <section className={Style.prac}>
      <p>تمارين</p>
      <CostumeData.Provider
        value={{
          result,
          setResult,
          expectedLength,
          setExpectedLength,
          setPList,
          pList
        }}
      >
        <PracList />
        {pList.length > 0 && pList[parseInt(pindex)] && (
          <Interface pid={pList[parseInt(pindex)].pid} />
        )}
      </CostumeData.Provider>
    </section>
  );
}
