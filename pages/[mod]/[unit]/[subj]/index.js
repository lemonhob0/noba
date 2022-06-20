import Vd from "components/subj/vd";
import Style from "styles/subj/index.module.scss";
import Prac from "components/subj/prac";
import Content from "components/subj/content";
export default function Subj() {
  return (
    <>
      <Vd />
      <main className={Style.main}>
        <Content />
        <Prac />
      </main>
    </>
  );
}
