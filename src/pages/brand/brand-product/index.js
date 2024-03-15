import { baseUrl } from "@/api/apiConfig";
import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import BrandProduct from "@/components/pageComponents/BrandPage/BrandProduct";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Index = () => {
  const search = useSearchParams();
  const brandValue = search.get("brand");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getProductsByBrand/${brandValue}`
      );
      if (response) {
        setProducts(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="sw__brand__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Brand" />
        {/* OthersBanner */}
        <OthersBanner
          title="Brand"
          name="Home"
          subName="Brand / Brand Product"
        />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>

        <BrandProduct products={products} />
        {/* sw__gaps */}
        <div className="sw__gaps"></div>
      </div>
    </>
  );
};

export default Index;
