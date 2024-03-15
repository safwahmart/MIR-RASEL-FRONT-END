import Thankyou from "@/components/pageComponents/Thankyou";
import MetaHead from "@/utilities/MetaHead";
import React from "react";

const index = () => {
  return (
    <>
      <div className="sw__thankyou__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Thankyou" />

        <Thankyou />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>
      </div>
    </>
  );
};

export default index;
