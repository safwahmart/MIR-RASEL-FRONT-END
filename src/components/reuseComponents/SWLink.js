import Link from "next/link";
import React from "react";

const SWLink = ({ url, name, className }) => {
  return (
    <>
      <div className="sw__link">
        <Link href={url} className={className}>{name}</Link>
      </div>
    </>
  );
};

export default SWLink;
