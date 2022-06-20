import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { MyCookie } from "pages/_app";
import Style from "styles/subj/content.module.scss";
import Info from "./info";
import List from "./list";

const SUBJ_LIST = gql`
  query($mod: String!, $unit: String!, $uid: ID!) {
    subjList(mod: $mod, unit: $unit, uid: $uid) {
      title
      done
    }
  }
`;

export default function Content() {
  const router = useRouter();
  const cookie = useContext(MyCookie);
  const { mod, unit, subj } = router.query;
  const [subjme, { data, loading }] = useLazyQuery(SUBJ_LIST);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (subj && !loading && cookie)
      subjme({ variables: { mod, unit, uid: cookie.uid } });
  }, [subj, cookie]);

  useEffect(() => {
    if (data && data.subjList) setList(data.subjList);
  }, [data]);

  if (data && !data.subjList) router.replace("/app");

  return (
    <section className={Style.content}>
      {list.length > 0 && (
        <>
          <Info
            props={{
              subj: parseInt(subj),
              title: list[parseInt(subj)].title,
              length: list.length - 1,
              mod,
              unit
            }}
          />
          <List
            props={{
              list,
              mod,
              unit,
              subj
            }}
          />
        </>
      )}
    </section>
  );
}
