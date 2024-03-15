import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import { Brand } from "@/components/pageComponents/BrandPage/Brand";
import MetaHead from "@/utilities/MetaHead";

const index = () => {
  return (
    <>
      <div className="sw__brand__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Brand" />
        {/* OthersBanner */}
        <OthersBanner title="Brand" name="Home" subName="Brand" />

        <Brand />
      </div>
    </>
  );
};

export default index;
