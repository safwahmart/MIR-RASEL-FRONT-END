import HeaderTitle from "@/components/commons/HeaderTitle";
import { Col, Container, Row } from "react-bootstrap";
import SWProductCartList from "@/components/reuseComponents/SWProductCartList";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import { t } from "i18next";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try{
    const response = await axios.get(`${baseUrl}/newArrivals`);
    if (response) {
      console.log('response', response.data)
      setProducts(response.data);
    }
  }catch(err){
    console.log(err)
  }
  }
  return (
    <>
      <section className="sw__home__product">
        <Container>
          <Row>
            <Col lg={12}>
              <HeaderTitle title={t("New Arrival")} name="View All" url="/shop" />
            </Col>
          </Row>

          {/* sw__home__product__box */}
          <div className="sw__home__product__box">
            <Row>
              {products?.map((data, i) => {
                const discount = data.sale_price - ((data.sale_price * data.discount) / 100);
                return (
                  <Col sm={6} lg={6} xl={4} xxl={3} key={i}>
                    <div className="sw__home__product__item">
                      <SWProductCartList
                        image={data.thumbnail_image}
                        imgUrl={data.product_slug}
                        title={data.product_name}
                        title_bn={data.product_name_bn}
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
                        isButton={false}
                        data={data}
                      />
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomeProduct;
