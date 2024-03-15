import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SWProductCart from "@/components/reuseComponents/SWProductCartList";

const CategoryProduct = ({ products }) => {
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
                  <Col sm={6} lg={6} xl={4} xxl={3} key={i}>
                    <div className="sw__home__product__item">
                      <SWProductCart
                        image={data.thumbnail_image}
                        imgUrl={data.product_slug}
                        title={data.product_name}
                        titleUrl={data.product_slug}
                        price={data.sale_price}
                        discountPrice={discount}
                        discount={data.discount}
                        discountType={data.discount ? `Save ${data.discount}%` : ``}
                        appPrice={data.app_price}
                        stockIn={data.stock_in}
                        stockOut={data.stock_out}
                        rating={data.rating}
                        productType={'data.productType'}
                        isButton={'data.isButton'}
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

export default CategoryProduct;
