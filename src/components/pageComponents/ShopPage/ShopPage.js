import SWDropdown from "@/components/reuseComponents/SWDropdown";
// import SWProductCart from "@/components/reuseComponents/SWProductCart";
import { H6 } from "@/components/reuseComponents/Tags";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Category, FeatureBrand, ShopAvailability, ShortBy } from "./Data";
import SWProductCartList from "@/components/reuseComponents/SWProductCartList";

const ShopPage = ({products}) => {
  
  return (
    <div className="sw__shop__page">
      {/* sw__filter */}
      <div className="sw__filter">
        <Container>
          <Row>
            <Col lg={12} className="d_flex gap-3">
              <h3>Filter by : </h3>

              {/* Category */}
              <SWDropdown title="Products">
                {Category?.map((data, i) => (
                  <li className="d_flex d_justify gap-3" key={i}>
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id={`default-${data.id}`}
                      label={`default ${data.title}`}
                    />
                    <H6 h6={data.quantity} />
                  </li>
                ))}
              </SWDropdown>

              {/* FeatureBrand */}
              <SWDropdown title="Feature Brand">
                {FeatureBrand?.map((data, i) => (
                  <li className="d_flex d_justify gap-3" key={i}>
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id={`default-${data.id}`}
                      label={`default ${data.title}`}
                    />
                    <H6 h6={data.quantity} />
                  </li>
                ))}
              </SWDropdown>

              {/* Short By */}
              <SWDropdown title="Short By Latest">
                {ShortBy?.map((data, i) => (
                  <li className="d_flex d_justify gap-3" key={i}>
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id={`${data.id}`}
                      label={` ${data.title}`}
                    />
                  </li>
                ))}
              </SWDropdown>

              {/* Availability */}
              <SWDropdown title="Availability">
                {ShopAvailability?.map((data, i) => (
                  <li className="d_flex d_justify gap-3" key={i}>
                    <Form.Check // prettier-ignore
                      type="checkbox"
                      id={`default-${data.id}`}
                      label={`default ${data.title}`}
                    />
                    <H6 h6={data.quantity} />
                  </li>
                ))}
              </SWDropdown>

              <div className="sw__shop__price__range">
                <Form.Label>Price Range</Form.Label>
                <Form.Range />
                <div className="sw__shop__price__range__price">
                  {/* left */}
                  <div className="sw__shop__price__range__price__item">
                    <i className="flaticon-taka"></i>
                    <H6 h6="10" />
                  </div>
                  {/* right */}
                  <div className="sw__shop__price__range__price__item">
                    <i className="flaticon-taka"></i>
                    <H6 h6="10000" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* bdr */}
      <div className="sw_bdr"></div>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* sw__home__product__box */}
      <div className="sw__home__product__box">
        <Container>
          <Row>
            {products?.map((data, i) => {
              const discount = data.sale_price - ((data.sale_price * data.discount)/100);
              return(
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
                    discountType={data.discount?`Save ${data.discount}%`:``}
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
        </Container>
      </div>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>
    </div>
  );
};

export default ShopPage;
