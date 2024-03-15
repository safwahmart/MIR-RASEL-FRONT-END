import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from "react-bootstrap";
import SWImages from "@/components/reuseComponents/SWImages";
import { H4, P } from "@/components/reuseComponents/Tags";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const Index = () => {
    const [show, setShow] = useState(false);
    const [searchParam, setSearchParam] = useSearchParams('email_verify_url');
    useEffect(() => {
        if (searchParam?.length > 1) {
            axios.get(searchParam[1]);
        }
    }, [])
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
                                        <H4 h4='Welcome to safwahmart!' />
                                    </div>
                                    <Alert variant="success" show={true}>
                                        Email Verification Completed.
                                    </Alert>
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
