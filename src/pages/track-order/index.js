import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import TrackOrder from "@/components/pageComponents/TrackOrder/TrackOrder";
import MetaHead from "@/utilities/MetaHead";

export default function Index() {
  return (
    <>
      <MetaHead metaTitle="Track Order" />
      {/* OthersBanner */}
      <OthersBanner title="Track Order" name="Home" subName="Track Order" />
      <TrackOrder />
    </>
  );
}
