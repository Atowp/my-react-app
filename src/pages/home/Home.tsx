import type { JSX } from "react";
import React from "react";
import NavComponent from "../../component/nav/Nav";

function useRepeatElements(count: number, element: JSX.Element) {
  return Array.from({ length: count }, (_, index) =>
    React.cloneElement(element, { key: index })
  );
}

function HomePage() {
  const content = "Welcome to my React App";

  const repearParagraph = useRepeatElements(100, <p>{content}</p>);

  return (
    <>
      <NavComponent />
      <div className="pt-16">
        <h1 className="text-3xl font-bold text-center">New Entrance</h1>
        {repearParagraph}
      </div>
    </>
  );
}

export default HomePage;
