import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import Checkout from "@/components/pageComponents/CheckoutPage/Checkout";
import MetaHead from "@/utilities/MetaHead";
import React from "react";

const index = () => {
  return (
    <>
      <div className="sw__checkout__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Checkout" />

        {/* checkput */}
        <Checkout />
        

        <div className="sw__gaps"></div>

      </div>
    </>
  );
};

export default index;
