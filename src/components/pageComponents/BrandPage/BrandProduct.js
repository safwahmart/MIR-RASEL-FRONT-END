import SWProductCart from "@/components/reuseComponents/SWProductCartList";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductData } from "./ProductData";
import SWProductCartList from "@/components/reuseComponents/SWProductCartList";

const BrandProduct = ({ products }) => {
  return (
    <>
      <div className="sw__brand__product">
        {/* sw__home__product__box */}
        <div className="sw__home__product__box">
          <Container>
            <Row>
              {products.length>0?products?.map((data, i) => {

                const discount = data.sale_price - ((data.sale_price * data.discount) / 100);
                return (
                  <Col lg={3} key={i}>
                    <div className="sw__home__product__item">
                      <SWProductCartList
                        image={data.thumbnail_image}
                        imgUrl={data.product_slug}
                        title={data.product_name}
                        titleUrl={data.product_slug}
                        price={data.sale_price}
                        discountPrice={discount}
                        discount={data.discount}
                        discountType={data.discount ? `Save ${data.discount}%` : ``}
                        appPrice={data.app_price}
                        productType={'data.productType'}
                        isButton={false}
                        stockIn={data.stock_in}
                        stockOut={data.stock_out}
                        rating={data.rating}
                        data={data}
                      />
                    </div>
                  </Col>
                )
              }):'No Product Found'}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default BrandProduct;
