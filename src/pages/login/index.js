import SWButton from "@/components/reuseComponents/SWButton";
import SWImages from "@/components/reuseComponents/SWImages";
import SWLink from "@/components/reuseComponents/SWLink";
import { H4, P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react'

const Index = () => {
  const router = useRouter()
  const { data: session, status } = useSession();
  if(status === 'authenticated'){
  console.log('google',session)
  }
  useEffect(()=>{
    if(status === 'authenticated'){
      providerLogin()
    }
  },[status])

  const providerLogin =async()=>{
    try {
      const response = await axios.post(`${baseUrl}/login`, { email: session.user.email, provider: 'google',social:true,token:session.id_token,name:session.user.name });

      debugger;
      if (response.data.status === true) {
        toast.success(response.data.message);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        // router.push("/client-dashboard")
        window.location.replace("/client-dashboard");
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message)
    }
  }
  const handleProviderLogin =async(e,provider)=>{
    e.preventDefault();
    // signOut(provider)
    // // const session = await getSession()
    // debugger;
    signIn(provider)
  }
  console.log('environment',process.env.NEXTAUTH_URL)
  console.log('environment',process)
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
                      email: '',
                      password: ''
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                      password: Yup.string()
                        .required('Please Enter your password')
                        .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                        )
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      try {
                        const response = await axios.post(`${baseUrl}/login`, { email: values.email, password: values.password,social:false });

                        debugger;
                        if (response.data.status === true) {
                          toast.success(response.data.message);
                          localStorage.setItem('user', JSON.stringify(response.data.user))
                          localStorage.setItem('token', response.data.token)
                          // router.push("/client-dashboard")
                          window.location.replace("/client-dashboard");
                        } else {
                          toast.error(response.data.message)
                        }
                      } catch (err) {
                        console.error(err);
                        toast.error(err.response.data.message)
                      }
                    }}
                  >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                      <form noValidate onSubmit={handleSubmit}>
                        {/*login__page__form*/}
                        <div className="login__page__form">
                          <div className="sw__custom__input">
                            <input
                              type="text"
                              placeholder="Please enter your Phone Number or Email"
                              name="email"
                              required onChange={handleChange} onBlur={handleBlur} value={values.email}
                            />
                          </div>
                          <div className="sw__custom__input">
                            <input
                              type="password"
                              placeholder="Please enter your password"
                              name="password"
                              required onChange={handleChange} onBlur={handleBlur} value={values.password}
                            />
                            {errors.email && touched.email && errors.email}
                          </div>
                          <div className="sw__custom__input d_flex d_justify">
                            <div className="d_flex">
                              <input
                                type="checkbox"
                                id="keppLogin"
                                placeholder="Please enter your password"
                              />
                              {errors.password && touched.password && errors.password}
                              <label htmlFor="keppLogin">Keep me logged in</label>
                            </div>
                            <SWLink url="reset-password" name="Reset Your Password" />
                          </div>
                          <div className="sw__custom__input">
                            {/* <SWButton name="Log in" type="submit" className="bg" /> */}
                            <button disabled={isSubmitting?true:false} className={"bg"} type={"submit"}>Log in</button>
                          </div>
                          {/* sw__login__with__FB__Google */}
                          <div className="sw__login__with__FB__Google">
                            {/* fb */}
                            <Link href="" onClick={(e)=>handleProviderLogin(e,'facebook')}>
                              <SWImages
                                image="/images/facebook.png"
                                height="128"
                                width="128"
                                alt="fb"
                              />
                            </Link>
                            {/* google */}
                            <Link href="" onClick={(e)=>handleProviderLogin(e,'google')}>
                              <SWImages
                                image="/images/google.png"
                                height="128"
                                width="128"
                                alt="fb"
                              />
                            </Link>
                          </div>
                          <div className="sw__custom__input d_flex">
                            <P p="New member?" />
                            <SWLink url="registration" name="Register here" />
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
