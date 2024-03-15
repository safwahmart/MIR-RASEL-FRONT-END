import React from "react";
import { H2 } from "../reuseComponents/Tags";
import SWLink from "../reuseComponents/SWLink";

const HeaderTitle = ({ title, url, name }) => {
  return (
    <>
      <div className="sw__heading__title d_flex d_justify">
        <H2 h2={title} />
        <SWLink url={url} name={name} />
      </div>
    </>
  );
};

export default HeaderTitle;
