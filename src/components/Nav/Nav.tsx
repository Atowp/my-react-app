import { Link } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { Dropdown, Space, type MenuProps } from "antd";
import styles from "./Nav.module.less";

const CptItems: React.FC<{ items?: MenuProps["items"] }> = ({ items }) => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()} className={styles.dropdownTrigger}>
        <Space>Components</Space>
      </a>
    </Dropdown>
  );
};

function Nav() {
  const navItems = [
    { to: "/", label: "Index" },
    { to: "/about", label: "About" },
  ];

  const items: MenuProps["items"] = [
    {
      label: <Link to="/ticTacToe">ticTacToe</Link>,
      key: "1",
    },
    {
      label: <Link to="/todoList">todoList</Link>,
      key: "2",
    },
    {
      label: <Link to="/filterableProductTable">table</Link>,
      key: "3",
    },
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
            <CptItems items={items} />
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav;
