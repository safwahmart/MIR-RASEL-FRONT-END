import Link from "next/link";
import { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";

const SWDropdown = ({ title, children }) => {
  return (
    <>
      <div className="sw__dropdown">
        <DropdownButton id="dropdown-basic-button" title={title}>
          {children}
        </DropdownButton>
      </div>
    </>
  );
};

export default SWDropdown;

<SWDropdown title="Language">
  <li>English</li>
  <li>Bangla</li>
</SWDropdown>;
