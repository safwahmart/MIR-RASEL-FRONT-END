import { baseUrl } from "@/api/apiConfig";
import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import ShopPage from "@/components/pageComponents/ShopPage/ShopPage";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async() => {
    try{
      const response = await axios.get(`${baseUrl}/getProducts`);
      if (response) {
        setProducts(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  return (
    <>
      <div className="sw__shop__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Shop" />
        {/* OthersBanner */}
        <OthersBanner title="Shop" name="Home" subName="Shop" />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>

        <ShopPage products={products}/>
      </div>
    </>
  );
};

export default Index;
