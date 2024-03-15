import React from "react";

const SWButton = ({ name, className,type="button" }) => {
  return (
    <>
      <button className={className} type={type}>{name}</button>
    </>
  );
};

export default SWButton;
