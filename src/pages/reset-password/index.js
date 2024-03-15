import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
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
    const router = useRouter()
    return (
        <>
            <section className='login__page'>
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
                                        <H4 h4='Welcome to safwahmart!' />
                                    </div>
                                    <Formik
                                        initialValues={{
                                            phone: '',
                                            submit: null
                                        }}
                                        validationSchema={Yup.object().shape({
                                            phone: Yup.number().required('Please Enter a Phone Number'),
                                        })}
                                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                            try {
                                                const response = await axios.post(`${baseUrl}/forgetPassPhone`, { phone: values.phone });
                                                // await register(values.email, values.password, values.firstName, values.lastName);
                                                if (response.data.status === true) {
                                                    // await axios.post(`${baseUrl}/email/verification-notification`,{
                                                    //   userId: response.data.user.id
                                                    // });
                                                    toast.success('Send an OTP on your mobile.');
                                                    localStorage.setItem('information', JSON.stringify(response.data.user))
                                                    router.push("/reset-password/otp")
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
                                                {/*login__page__form*/}
                                                <div className="login__page__form">

                                                    <H4 h4='No problem! Just follow the simple step' />

                                                    <div className="sw__custom__input">
                                                        <input type="text" placeholder='Enter your Phone Number' name="phone" required onChange={handleChange}
                                                            onBlur={handleBlur} value={values.phone} />
                                                    </div>

                                                    <div className="sw__custom__input">
                                                        <SWButton name='Send OTP' type='submit' className='bg' />
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
