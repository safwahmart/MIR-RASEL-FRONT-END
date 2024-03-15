import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import { Blog } from "@/components/pageComponents/BlogPage/Blog/Blog";
import { Brand } from "@/components/pageComponents/BrandPage/Brand";
import SubCategory from "@/components/pageComponents/Category/SubCategory/SubCategory";
import MetaHead from "@/utilities/MetaHead";
import React from "react";

const index = () => {
  return (
    <>
      <div className="sw__blog__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Blog" />
        {/* OthersBanner */}
        <OthersBanner title="Blog" name="Home" subName="Blog" />
        <Blog />
      </div>
    </>
  );
};

export default index;
