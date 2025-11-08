import { useEffect, useState } from "react";
import "./ThemeSwitch.less";
import {
  applyTheme,
  isDark,
  readTheme,
  toggleTheme,
  watchSystemChange,
} from "../../utils/theme";

function ThemeSwitchComponent() {
  const [state, setState] = useState(readTheme);

  useEffect(() => {
    applyTheme(state);
  }, [state]);

  useEffect(() => {
    const unlisten = watchSystemChange(() => {
      setState((cur) => (cur.kind === "auto" ? readTheme() : cur));
    });
    return unlisten;
  }, []);

  const handleChange = () => setState((prev) => toggleTheme(prev));

  const text = state.kind === "auto" ? "AUTO" : state.value.toUpperCase();
  const dark = isDark(state);

  return (
    <label className="switch" style={{ width: 80 }}>
      <input type="checkbox" checked={dark} onChange={handleChange} />
      <span
        className={`slider flex items-center justify-between ${
          dark ? "" : "flex-row-reverse"
        }`}
        style={{ padding: "0 8px" }}
      >
        <span className="slider-text text-xs">{text}</span>
      </span>
    </label>
  );
}

export default ThemeSwitchComponent;
