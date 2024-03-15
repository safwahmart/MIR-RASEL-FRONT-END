import { baseUrl } from "@/api/apiConfig";
import ProductDetails from "@/components/pageComponents/ProductDetails/ProductDetails";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";


const Page = () => {
  const router = useRouter();
  const product = router.query.product;
  const [productData, setProductData]= useState({})
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async() => {
    try{
      const response = await axios.get(`${baseUrl}/getProductId/${product}`);
      if (response) {
        setProductData(response.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  console.log('productData?.product_images',productData.thumbnail_image)
  return (
    <>
      <div className="sw__product__details__page">
        {productData.product_name !== undefined &&<MetaHead metaTitle={productData.product_name} metaDesc={productData.short_desc} metaImage={productData?.thumbnail_image}/>}
        <ProductDetails productData={productData}/>
      </div>
    </>
  );
};

export default Page;
