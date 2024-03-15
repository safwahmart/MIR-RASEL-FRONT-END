import { baseUrl } from "@/api/apiConfig";
import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import SubCategory from "@/components/pageComponents/Category/SubCategory/SubCategory";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Index = () => {
  const search = useSearchParams();
  const category = search.get('sub')

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getSubCategory/${category}`);
      if (response) {
        setProducts(response.data?.data);
      }

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {/* MetaTag */}
      <MetaHead metaTitle="Sub-Category" />
      {/* OthersBanner */}
      <OthersBanner
        title="Sub Categories"
        name="Home"
        subName="All Categories / Sub-Categories"
      />

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      <SubCategory subCategories={products} />
    </>
  );
};

export default Index;
