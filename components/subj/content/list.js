import Style from "styles/subj/content.module.scss";
import Link from "next/link";
import { PlayBtn } from "components/svg/ui";

export default function List({ props }) {
  const { list, mod, unit, subj } = props;
  return (
    <div className={Style.list}>
      <p>دروس</p>
      <ul>
        {list.map((e, i) => {
          return (
            <Link scroll={false} key={i} href={`/${mod}/${unit}/${i}`}>
              <li
                className={
                  i == subj ? Style.select : e.done ? Style.done : Style.yet
                }
              >
                <p className="ar">{e.title}</p>
                {i == subj && <PlayBtn />}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
