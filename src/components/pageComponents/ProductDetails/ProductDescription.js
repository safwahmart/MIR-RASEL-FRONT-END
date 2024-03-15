import SWButton from "@/components/reuseComponents/SWButton";
import SWImages from "@/components/reuseComponents/SWImages";
import { SWInput, SWLabel } from "@/components/reuseComponents/SWInput";
import { H4, H6, P } from "@/components/reuseComponents/Tags";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HomeProduct from "../HomePage/HomeProduct/HomeProduct";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from 'yup';
import { headers } from "@/api/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Rating as ReactRating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { baseUrl } from "@/api/apiConfig";
import moment from 'moment'

const ProductDescription = ({ productData }) => {
  const [userData, setUserData] = useState({})
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      setUserData(user);
    }
  }, []);
  useEffect(() => {
    if (Object.keys(productData).length>0 && userData !== undefined && userData !== null && Object.keys(userData).length > 0) {
      getReviewList()
    }
  }, [productData,userData]);

  const getReviewList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/reviewListsByUser/${productData.id}`, { headers: headers });
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  return (
    <>
      <section className="sw__pd__product__description">
        <Container>
          <Row>
            <Col lg={12}>
              {/* product description */}
              <div className="sw__pd__product__description__tabs">
                <Tabs
                  defaultActiveKey="description"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="description" title="Description">
                    <div  contentEditable='true' 
                      dangerouslySetInnerHTML={{ __html: productData.desc?.replace(/<[\/]{0,1}(div)[^><]*>/g,"") }}
                    />
                  </Tab>
                  <Tab eventKey="ratingReviews" title="Rating & Reviews">
                    <H4 h4="Customer questions & answers" />

                    {reviews.length > 0 && reviews.map((res, i) => {
                      // eslint-disable-next-line react/jsx-key
                      return <><div className="sw__profile__photo d_flex d_justify">

                        {/* left */}

                        <div className="sw__left d_flex">

                          <div className="sw__img">

                            <SWImages

                              image="/images/review.png"

                              alt="photo"

                              width="60"

                              height="60"

                            />

                          </div>

                          <div className="sw__text">

                            <H6 h6={res.name} />

                            <P p={moment(res.created_at).format('MMMM Do YYYY, h:mm:ss a')} />

                          </div>

                        </div>



                        {/* right */}

                        <div className="sw__right d_flex">

                          {Array.from(Array(eval(res.rating)), (e, i) => <i key={i} className="flaticon-star"></i>)}

                        </div>

                      </div>
                        <P p={res.review} /></>
                    })}


                    <Formik
                      initialValues={{
                        review: '',
                      }}
                      validationSchema={Yup.object().shape({
                        review: Yup.string().required('Enter your review'),
                      })}
                      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                        try {
                          const response = await axios.post(`${baseUrl}/reviews`, { review: values.review, user_id: userData?.id, product_id: productData?.id, rating: rating }, { headers: headers });

                          if (response.data.status === true) {
                            setReviews(
                              [
                                ...reviews,
                                response.data.data
                              ]
                            );
                            toast.success(response.data.message);
                            resetForm({value: ''});
                            setRating(0)
                          } else {
                            toast.error(response.data.message)
                          }
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          {/* name */}
                          {/* <SWLabel name="Name" star="*" />
                      <SWInput type="name" name="" placeholder="" /> */}

                          {/* email */}
                          {/* <SWLabel name="Email" star="*" />
                      <SWInput type="email" name="" placeholder="" /> */}

                          {/* message */}
                          {userData ? <><div className="sw__form">
                            <H4 h4="Add a Review" />
                            <SWLabel name="Your review" star="*" />
                            <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
                            <div className="sw__custom__input">
                              <textarea name="review" rows="5" value={values.review} onChange={handleChange} onBlur={handleBlur}></textarea>
                              {errors.review && touched.review && errors.review}
                            </div>
                          </div>

                            <SWButton type="submit" name="Add Review" className="bg" /></> : <Link href={'/login'}>Please Login to add your review</Link>}
                        </form>
                      )}
                    </Formik>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container >
      </section >

      {/* sw__gaps */}
      < div className="sw__gaps" ></div >
      <HomeProduct />
    </>
  );
};

export default ProductDescription;
