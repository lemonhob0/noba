import { useRef, useEffect, useState } from "react";
import Style from "styles/app/index.module.scss";
export default function ModFind({ props }) {
  const { find, setFind, loading } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();
  const focusMe = () => {
    const { current } = inputRef;
    setIsFocus(current === document.activeElement);
  };
  useEffect(() => {
    document.addEventListener("click", focusMe);
    return () => {
      document.addEventListener("click", focusMe);
    };
  }, []);
  return (
    <form
      className={loading ? Style.loading : "nono"}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <input
        ref={inputRef}
        value={find}
        onChange={e => setFind(e.target.value)}
        type="text"
        placeholder="ابحث عن درس..."
        className={isFocus && !loading ? Style.focus : "nono"}
      />
    </form>
  );
}
