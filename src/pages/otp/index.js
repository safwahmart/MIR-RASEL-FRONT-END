import SWButton from "@/components/reuseComponents/SWButton";
import SWImages from "@/components/reuseComponents/SWImages";
import { SWLabel } from "@/components/reuseComponents/SWInput";
import { H4 } from "@/components/reuseComponents/Tags";
import { Col, Container, Row } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const [userData,setUserData] = useState({})
  const router = useRouter()
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('information');
      const user = JSON.parse(userlocal);
      setUserData(user);
    }
  },[])
  return (
    <>
      <section className="login__page">
        <SWImages
          image="/images/login-bg.png"
          width="1000"
          height="500"
          alt="login=img"
          className="login__bg__img"
        />

        <div className="login__page__content">
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={5}>
                <div className="login__page__box">
                  {/*header*/}
                  <div className="header">
                    <div className="sw__images">
                      <SWImages
                        image="/images/logo.webp"
                        width="300"
                        height="80"
                        alt="logo"
                      />
                    </div>
                    <H4 h4="Welcome to safwahmart!" />
                  </div>
                  <Formik
                    initialValues={{
                      otp: '',
                      user_id: userData?.id
                    }}
                    validationSchema={Yup.object().shape({
                      otp: Yup.string().required('Please Enter otp'),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      try {
                        const response = await axios.post(`${baseUrl}/checkOtp`, { otp: values.otp, user_id: userData?.id });

                        if (response.data.status === true) {
                          toast.success(response.data.message);
                          localStorage.removeItem('user')
                          router.push("/login")
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
                        {/*login__page__form*/}
                        <div className="login__page__form">
                          <div className="sw__custom__input">
                            <SWLabel name="Enter your OTP" />
                            <input
                              type="text"
                              placeholder="Please enter your OTP"
                              className="mt-2"
                              name="otp"
                              required onChange={handleChange} onBlur={handleBlur} value={values.otp}
                            />
                            {errors.otp && touched.otp && errors.otp}
                          </div>

                          <div className="">
                            <SWButton name="Resend" className="bg" />
                            <SWButton type="submit" name="Submit" className="bg" />
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <div className="sw__gaps"></div>
    </>
  );
};

export default Index;
