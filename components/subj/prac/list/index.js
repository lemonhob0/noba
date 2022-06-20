import { gql, useLazyQuery } from "@apollo/client";
import { MyCookie } from "pages/_app";
import { CostumeData } from "../index";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Style from "styles/subj/prac.module.scss";
import Ul from "./ul";

const Prac_List = gql`
  query($uid: ID!, $mod: String!, $unit: String!, $subj: Int!) {
    practiceList(uid: $uid, mod: $mod, unit: $unit, subj: $subj) {
      pid
      correct
    }
  }
`;

export default function PracList() {
  const cookie = useContext(MyCookie);
  const { setPList, pList } = useContext(CostumeData);
  const router = useRouter();
  const { mod, unit, subj } = router.query;
  const [listme, { loading, data }] = useLazyQuery(Prac_List);

  useEffect(() => {
    if (cookie && mod && !loading)
      listme({
        variables: { mod, unit, subj: parseInt(subj), uid: cookie.uid }
      });
  }, [cookie, mod, subj]);

  useEffect(() => {
    if (!loading && data && data.practiceList.length > 0)
      setPList(data.practiceList);
  }, [data, loading]);

  return (
    <div className={Style.pracList}>
      {pList.length > 0 && !loading && <Ul loading={loading} />}
      {loading && <ULoading />}
    </div>
  );
}

function ULoading() {
  return (
    <ul className={Style.uLoading}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
