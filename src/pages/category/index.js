import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import Category from "@/components/pageComponents/Category/Category";
import MetaHead from "@/utilities/MetaHead";
import { baseUrl } from "@/api/apiConfig";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getCategories`);
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
      <MetaHead metaTitle="Category" />
      {/* OthersBanner */}
      <OthersBanner
        title="All categories"
        name="Home"
        subName="All categories"
      />

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      <Category categories={products} />
    </>
  );
};

export default Index;
