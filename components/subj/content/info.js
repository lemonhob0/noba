import Style from "styles/subj/content.module.scss";
import Link from "next/link";
import Head from "next/head";

export default function Info({ props }) {
  const { subj, title, length, mod, unit } = props;
  return (
    <>
      <Head>
        <title>{title + " - " + unit}</title>
      </Head>
      <h1 className="ar">{title}</h1>
      <div className={Style.info}>
        {subj !== length && (
          <Link scroll={false} href={`/${mod}/${unit}/${subj + 1}`}>
            <button className={Style.next}>
              <span>{`<<`}</span> التالي
            </button>
          </Link>
        )}
        {subj !== 0 && (
          <Link scroll={false} href={`/${mod}/${unit}/${subj - 1}`}>
            <button className={Style.prv}>
              السابق <span>{`>>`}</span>
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
