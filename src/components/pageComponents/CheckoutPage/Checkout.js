import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import SWButton from "@/components/reuseComponents/SWButton";
import SWImages from "@/components/reuseComponents/SWImages";
import { SWInput, SWLabel } from "@/components/reuseComponents/SWInput";
import SWLink from "@/components/reuseComponents/SWLink";
import SWList from "@/components/reuseComponents/SWList";
import { H3, H4, H5, H6, P } from "@/components/reuseComponents/Tags";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const [userData, setUserData] = useState({})
  const [districts, setDistricts] = useState([])
  const [countries, setCountries] = useState([])
  const [areas, setAreas] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      setUserData(user);
      checkLogin(user);
    }
    getDistricts();
    getCountries();
  }, [])

  const checkLogin = (user) => {
    if (user === null || Object.keys(user).length === 0) {
      router.push('/login')
    }
  }

  const getDistricts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getDistricts`);
      setDistricts(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  const getCountries = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getCountries`);
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  const getArea = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/getAreaByDistrict/${id}`);
      setAreas(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.sale_price,
      0
    );
  };
  const getTotal = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
  };
  const getTotalVat = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + eval(item.vat), 0
    );
  };
  const getTotalDiscount = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + eval(item.discount),
      0
    );
  };
  return (
    <>
      {userData !== null && Object.keys(userData).length > 0 && <Formik
        initialValues={{
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          country: '',
          city: '',
          area: '',
          zip_code: '',
          address: '',
          plan: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          name: Yup.string().required('Please Enter a name'),
          phone: Yup.number().required('Please Enter a Phone Number'),
          country: Yup.number().required('Please Select Country'),
          city: Yup.number().required('Please Select City'),
          area: Yup.number().required('Please Select Area'),
          zip_code: Yup.string().required('Please Enter Zip Code'),
          address: Yup.string().required('Please Enter address'),
          plan: Yup.string().required('Select a plan'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          debugger;
          try {
            const response = await axios.post(`${baseUrl}/createOrder`,
              { name: values.name, email: values.email, phone: values.phone, country: values.country, city: values.city, area: values.area, zip_code: values.zip_code, address: values.address, user_id: userData.id, plan: values.plan, total_price: (getTotalPrice() + getTotalVat()) - getTotalDiscount(), vat: getTotalVat(), discount: getTotalDiscount() }, {
              headers: headers
            });
            // await register(values.email, values.password, values.firstName, values.lastName);
            if (response.data.status === true) {
              // setShow(true)
              // await axios.post(`${baseUrl}/email/verification-notification`,{
              //   userId: response.data.user.id
              // });
              if (values.plan === '1') {
                localStorage.setItem('transaction_id', response.data.transaction_id)
                router.push(response.data.redirect.data);
              } else {
                toast.success('Order has been placed');
                router.push("/thankyou")
              }
              // router.push("/thankyou")
            } else {
              toast.error('something wrong')
            }
          } catch (err) {
            console.error(err);
            // if (scriptedRef.current) {
            //   setStatus({ success: false });
            //   setErrors({ submit: err.message });
            //   setSubmitting(false);
            // }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <section className="sw__checkout__page sw__top__gaps">
              <Container>
                <Row>
                  {/* left */}
                  <Col lg={8}>
                    <div className="sw__checkout__left">
                      <H3 h3="Shipping Address" />

                      <Row>
                        <Col lg={12}>
                          <SWLabel name="Name" star="*" />
                          <SWInput type="text" name={'name'} onChange={handleChange}
                            onBlur={handleBlur} value={values.name} placeholder="" />
                          {errors.name && touched.name && errors.name}
                        </Col>

                        <Col sm={6} lg={6}>
                          <SWLabel name="Email" star="*" />
                          <SWInput type="email" onChange={handleChange} name={'email'}
                            onBlur={handleBlur} value={values.email} placeholder="" />
                          {errors.email && touched.email && errors.email}
                        </Col>

                        <Col sm={6} lg={6}>
                          <SWLabel name="Phone" star="*" />
                          <SWInput type="text" onChange={handleChange} name={'phone'}
                            onBlur={handleBlur} value={values.phone} placeholder="" />
                          {errors.phone && touched.phone && errors.phone}
                        </Col>

                        <Col sm={6} lg={6}>
                          <SWLabel name="Country" star="*" />
                          <Form.Select aria-label="Default select example" onChange={handleChange}
                            onBlur={handleBlur} value={values.country} name="country">
                            <option>Select Country</option>
                            {countries?.map((data, i) => (<option key={i} value={data.id}>{data.country_name}</option>))}
                          </Form.Select>
                          {errors.country && touched.country && errors.country}
                        </Col>

                        <Col sm={6} lg={6}>
                          <SWLabel name="City" star="*" />
                          <Form.Select aria-label="Default select example" onChange={(e) => { handleChange(e); getArea(e.target.value) }} onBlur={handleBlur} value={values.city} name="city">
                            <option>Select City</option>
                            {districts?.map((data, i) => (<option key={i} value={data.id}>{data.name}</option>))}
                          </Form.Select>
                          {errors.city && touched.city && errors.city}
                        </Col>

                        <Col sm={6} lg={6}>
                          <SWLabel name="Select Area" star="*" />
                          <Form.Select aria-label="Default select example" onChange={handleChange}
                            onBlur={handleBlur} value={values.area} name="area">
                            <option>Select Area</option>
                            {areas?.map((data, i) => (<option key={i} value={data.id}>{data.name}</option>))}
                          </Form.Select>
                          {errors.area && touched.area && errors.area}
                        </Col>

                        <Col sm={6} lg={6}>
                          <SWLabel name="Zip Code" star="*" />
                          <SWInput type="text" placeholder="" name={'zip_code'} onChange={handleChange}
                            onBlur={handleBlur} value={values.zip_code} />
                          {errors.zip_code && touched.zip_code && errors.zip_code}
                        </Col>

                        <Col lg={12}>
                          <SWLabel name="Address" star="*" />
                          <div className="sw__custom__input">
                            <textarea
                              name="address"
                              rows="5"
                              placeholder="বাসা/ফ্ল্যাট নম্বর, পাড়া-মহল্লার নাম, পরিচিতির এলাকা উল্লেখ করুন"
                              onChange={handleChange}
                              onBlur={handleBlur} value={values.address}
                            ></textarea>
                            {errors.address && touched.address && errors.address}
                          </div>
                        </Col>

                        {/*  */}
                      </Row>
                    </div>
                  </Col>

                  {/* right */}
                  <Col lg={4}>
                    <div className="sw__checkout__right">
                      <H4 h4="Order Summary" />

                      <SWList>
                        <li>
                          <H5 h5={`Subtotal (${getTotal()} items)`} />
                          <P p={`৳ ${getTotalPrice().toFixed(2) ?? 0}`} />
                        </li>

                        {/* <li>
                          <H5 h5="Delivery Fee" />
                          <P p="৳ 100" />
                        </li> */}
                        {/* 
                        <li>
                          <H5 h5="Delivery Discount" />
                          <P p="৳ 100" />
                        </li> */}

                        <li>
                          <H5 h5="Vat" />
                          <P p={`৳ ${getTotalVat().toFixed(2)}`} />
                        </li>
                        <li>
                          <H5 h5="Discount" />
                          <P p={`৳ ${getTotalDiscount().toFixed(2)}`} />
                        </li>

                        <li>
                          <H5 h5="Payable Total" />
                          <P p={`৳ ${((getTotalPrice() + getTotalVat()) - getTotalDiscount()).toFixed(2)}`} />
                        </li>
                      </SWList>

                      <div className="sw__payment__method">
                        <H4 h4="Select Payment Method" />

                        <div className="sw__payment__method__item">
                          {/* item */}
                          <label className="card">
                            <input name="plan" className="radio" value="1" type="radio" onChange={handleChange} />
                            <SWImages
                              image="/images/online-payment.svg"
                              width="100"
                              height="30"
                              alt="ssl"
                            />
                          </label>
                          {/* item */}
                          <label className="card">
                            <input name="plan" className="radio" value="2" type="radio" onChange={handleChange} />
                            <SWImages
                              image="/images/cash-on.svg"
                              width="100"
                              height="30"
                              alt="ssl"
                            />
                          </label>
                        </div>
                        {errors.plan && touched.plan && errors.plan}
                        <SWButton name={"Place Order"} className={'bg'} type="submit" />

                        {/* <SWLink
                          name="Place Order"
                          url="/thankyou"
                          className="bg"
                        /> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </form>
        )}
      </Formik>}
    </>
  );
};

export default Checkout;
