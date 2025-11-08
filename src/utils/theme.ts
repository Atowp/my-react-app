type Manual = "dark" | "light";
type State = { kind: "auto" } | { kind: "manual"; value: Manual }; // types use semicolons

export function readTheme(): State {
  const c = localStorage.getItem("theme");
  return c === "light" || c === "dark"
    ? { kind: "manual", value: c }
    : { kind: "auto" };
}

export function applyTheme(state: State): void {
  const root = document.documentElement;
  if (state.kind === "manual") {
    root.setAttribute("data-theme", state.value);
  } else {
    root.removeAttribute("data-theme");
  }
}

export function isDark(state: State): boolean {
  return state.kind === "manual"
    ? state.value === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function toggleTheme(state: State): State {
  if (state.kind === "auto") {
    const next: Manual = isDark(state) ? "dark" : "light";
    const nextState: State = { kind: "manual", value: next };
    applyTheme(nextState);
    localStorage.setItem("theme", next);
    return nextState;
  }
  const next: Manual = state.value === "light" ? "dark" : "light";
  const nextState: State = { kind: "manual", value: next };
  applyTheme(nextState);
  localStorage.setItem("theme", next);
  return nextState;
}

export function watchSystemChange(cb: () => void): () => void {
  const m = window.matchMedia("(prefers-color-scheme: light)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
