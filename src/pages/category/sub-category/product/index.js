import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import CategoryProduct from "@/components/pageComponents/Category/CategoryProduct/CategoryProduct";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/api/apiConfig";

const Index = () => {
  const search = useSearchParams();
  const categoryValue = search.get('sub')

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getProductsByCategory/${categoryValue}`);
      if (response) {
        setProducts(response.data?.data);
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="sw__brand__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Product" />
        {/* OthersBanner */}
        <OthersBanner
          title="Category"
          name="Home"
          subName="Category / Sub-Category / Product"
        />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>

        <CategoryProduct products={products} />
        {/* sw__gaps */}
        <div className="sw__gaps"></div>
      </div>
    </>
  );
};

export default Index;
