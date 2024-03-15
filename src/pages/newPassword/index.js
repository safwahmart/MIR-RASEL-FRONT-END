import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from "react-bootstrap";
import SWImages from "@/components/reuseComponents/SWImages";
import { H4, P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import SWLink from "@/components/reuseComponents/SWLink";
import SWButton from "@/components/reuseComponents/SWButton";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const Index = () => {
  const [show, setShow] = useState(false);
  const [userData,setUserData] = useState({})
  const router = useRouter()
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('information');
      const user = JSON.parse(userlocal);
      setUserData(user);
    }
  },[])
  console.log('userdata',userData)
  return (
    <>
      <section className='login__page registration__page'>
        <SWImages image='/images/login-bg.png' width='1000' height='500' alt='login=img'
          className='login__bg__img' />

        <div className="login__page__content">
          <Container>
            <Row className='justify-content-center'>
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
                    <H4 h4='Set your new password!' />
                  </div>
                  <Formik
                    initialValues={{
                      password: '',
                      confirm_password: '',
                      submit: null
                    }}
                    validationSchema={Yup.object().shape({
                      password: Yup.string()
                        .required('Please Enter your password')
                        .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                        ),
                        confirm_password: Yup.string()
                        .required()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      try {
                        const response = await axios.post(`${baseUrl}/forgot_password`, { password: values.password,user:userData,confirm_password:values.confirm_password,email:'sonjoywc@gmail.com'});
                        // await register(values.email, values.password, values.firstName, values.lastName);
                        if (response.data.status ===  true) {
                          setShow(true)
                          // await axios.post(`${baseUrl}/email/verification-notification`,{
                          //   userId: response.data.user.id
                          // });
                          toast.success('New password has been set');                          
                          localStorage.removeItem('information')
                          router.push("/login")
                        }else{
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
                        {console.log('first',isSubmitting)}
                        {/*login__page__form*/}
                        <div className="login__page__form">

                          <div className="sw__custom__input">
                            <input type="password" placeholder='Enter your password' name='password' required onChange={handleChange}
                              onBlur={handleBlur} value={values.password} />
                            {errors.password && touched.password && errors.password}
                          </div>

                          <div className="sw__custom__input">
                            <input type="password" placeholder='Enter confirm password' name='confirm_password' required onChange={handleChange} onBlur={handleBlur} value={values.confirm_password} />
                            {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                          </div>

                          <div className="sw__custom__input">
                            <SWButton name='Change Password' className='bg' type='submit' />
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
        <Toaster />
      </section>

      <div className="sw__gaps"></div>
    </>
  );
};

export default Index;
