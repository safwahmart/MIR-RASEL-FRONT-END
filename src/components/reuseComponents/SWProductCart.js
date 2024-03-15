import Link from "next/link";
import { useEffect, useState } from "react";
import SWImages from "./SWImages";
import { H3, H4, H6 } from "./Tags";

// Skeleton for loading
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ModalProductDetails from "../pageComponents/ProductDetails/ModalProductDetails";

const SWProductCart = ({
  imgUrl,
  titleUrl,
  image,
  price,
  discountPrice,
  discountType,
  productType,
  appPrice,
  title,
  isButton,
}) => {
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Skeleton height={400} />
      ) : (
        <div className="sw__product__cart">
          {/* image */}
          <div className="sw__product__img">
            <Link href={imgUrl}>
              <SWImages
                image={image}
                alt="product-img"
                width="350"
                height="300"
              />
            </Link>
            {/* eye */}
            <div className="eye" onClick={handleShow}>
              <i className="flaticon-eye"></i>
            </div>
            {/* heart */}
            <div className="sw__product__heart">
              {/* <i className="flaticon-heart-1"></i> */}
              <i className="flaticon-heart"></i>
            </div>
          </div>
          <div className="sw__product__content">
            {/* price */}
            <div className="sw__product__price">
              <i className="flaticon-taka"></i>
              <H3 h3={price} />
              <del>
                <i className="flaticon-taka"></i> {discountPrice}
              </del>
              {discountType == "" ? (
                <span className="d-none">{discountType}</span>
              ) : (
                <span>{discountType}</span>
              )}
            </div>
            <h5>
              App Price :<i className="flaticon-taka"></i> {appPrice}
            </h5>
            <Link href={titleUrl}>
              <H4 h4={title} />
            </Link>
            <div className="sw__product__type">
              <H6 h6={productType} />
              <div className="sw__product__star">
                <i className="flaticon-star"></i>
                <i className="flaticon-star"></i>
                <i className="flaticon-star"></i>
                <i className="flaticon-star"></i>
                <i className="flaticon-star"></i>
              </div>
            </div>

            {isButton == false ? (
              <div className="sw__product__button">
                <button className="bg">
                  <Link href="/check-out">
                    <i className="flaticon-online-shopping"></i> Add to Cart
                  </Link>
                </button>
              </div>
            ) : (
              <div className="sw__product__button sw__duel__button">
                <button className="bg" disabled>
                  <i className="flaticon-out-of-stock"></i> Stock out
                </button>
                <button className="bg">Request</button>
              </div>
            )}
          </div>
        </div>
      )}

      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="product__cart__modal"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalProductDetails />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SWProductCart;
