import React from "react";

const SWList = ({ children, className }) => {
  return (
    <>
      <div className={`sw__list ${className}`}>
        <ul>{children}</ul>
      </div>
    </>
  );
};

export default SWList;
