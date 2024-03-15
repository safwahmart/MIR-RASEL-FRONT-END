import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import TrackOrderList from "@/components/pageComponents/TrackOrder/TrackOrderList";
import MetaHead from "@/utilities/MetaHead";

export default function Index() {
  return (
    <>
      <MetaHead metaTitle="Track Order List" />
      {/* OthersBanner */}
      <OthersBanner
        title="Track Order List"
        name="Home"
        subName="Track Order List"
      />
      <TrackOrderList />
    </>
  );
}
