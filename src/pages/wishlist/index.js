import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import Checkout from "@/components/pageComponents/CheckoutPage/Checkout";
import Wishlist from "@/components/pageComponents/wishlist/Wishlist";
import MetaHead from "@/utilities/MetaHead";
import React from "react";

const index = () => {
  return (
    <>
      <div className="sw__wishlist__page">
        {/* MetaTag */}
        <MetaHead metaTitle="wishlist" />

        {/* checkput */}
        <Wishlist />

        <div className="sw__gaps"></div>
      </div>
    </>
  );
};

export default index;
