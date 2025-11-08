import { Link } from "react-router-dom";
import ThemeSwitchComponent from "../theme-switch/ThemeSwitch";

function NavComponent() {
  const navItems = [
    { to: "/", label: "Index" },
    { to: "/about", label: "About" },
  ];

  const itemsClassName =
    "text-slate-200 hover:text-slate-200 hover:underline font-medium";

  const navItemsEle = navItems.map((item) => (
    <Link key={item.to} to={item.to} className={itemsClassName}>
      {item.label}
    </Link>
  ));

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-800 shadow-md">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="container mx-auto px-4 py-3 flex gap-6">
            {navItemsEle}
          </div>
          <div>
            <ThemeSwitchComponent />
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavComponent;
