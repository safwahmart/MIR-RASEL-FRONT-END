import ProductImage from "./ProductImage/ProductImage";

import ProductDescription from "./ProductDescription";

const ProductDetails = ({ productData }) => {
  return (
    <>
      <div className="sw__top__gaps"></div>
      <ProductImage productData={productData} />

      <div className="sw__gaps"></div>

      <ProductDescription productData={productData} />

      <div className="sw__gaps"></div>
    </>
  );
};

export default ProductDetails;
