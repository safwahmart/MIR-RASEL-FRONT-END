import SWButton from "@/components/reuseComponents/SWButton";
import { SWInput } from "@/components/reuseComponents/SWInput";
import { P } from "@/components/reuseComponents/Tags";
import { Col, Container, Row } from "react-bootstrap";
import ClientSidebar from "../ClientSidebar";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import toast from "react-hot-toast";
import { headers } from "@/api/auth";

const ClientPassword = () => {
  const [userData, setUserData] = useState({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      setUserData(user);
    }
  }, [])
  return (
    <>
      <div className="sw__client__dashboard__gaps">
        <Container>
          <Row>
            <Col lg={3}>
              <ClientSidebar />
            </Col>
            <Col lg={9}>
              <Formik
                initialValues={{
                  old_password: '',
                  new_password: '',
                  confirm_password: '',
                }}
                validationSchema={Yup.object().shape({
                  old_password: Yup.string().required('Please Enter old password'),
                  new_password: Yup.string()
                  .required('Please Enter your password')
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                  ),
                 confirm_password: Yup.string()
                  .required()
                  .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting,resetForm }) => {
                  try {
                    const response = await axios.post(`${baseUrl}/changePassword`, { old_password: values.old_password, user_id: userData?.id, new_password: values.new_password, confirm_password: values.confirm_password }, {headers:headers});

                    if (response.data.status === true) {
                      toast.success(response.data.message);
                      resetForm();
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
                    <div className="sw__client__dashboard__home">
                      <h3>
                        <i className="flaticon-authenticity"></i> Password
                      </h3>
                      <div className="sw__client__dashboard__profile">
                          <Row>
                            {/* item */}
                            <Col sm={6} lg={6}>
                              <div className="form__item">
                                <P p="Old Password" />
                                <div className="sw__custom__input">
                                <input
                                  type="password"
                                  placeholder="password"
                                  name="old_password"
                                  required onChange={handleChange} onBlur={handleBlur} value={values.old_password}
                                />
                                {errors.old_password && touched.old_password && errors.old_password}
                                </div>
                              </div>
                            </Col>
                            {/* item */}
                            <Col sm={6} lg={6}>
                              <div className="form__item">
                                <P p="New Password" />
                                <div className="sw__custom__input">
                                <input
                                  type="password"
                                  placeholder="New password"
                                  name="new_password"
                                  required onChange={handleChange} onBlur={handleBlur} value={values.new_password}
                                />
                                {errors.new_password && touched.new_password && errors.new_password}
                                </div>
                              </div>
                            </Col>

                            {/* item */}
                            <Col sm={6} lg={6}>
                              <div className="form__item">
                                <P p="Confirm Password" />
                                
                                <div className="sw__custom__input">
                                <input
                                  type="password"
                                  placeholder="Confirm password"
                                  name="confirm_password"
                                  required onChange={handleChange} onBlur={handleBlur} value={values.confirm_password}
                                />
                                {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                                </div>
                              </div>
                            </Col>

                            {/* item */}
                            <Col lg={12}>
                              <div className="form__item">
                            <SWButton type="submit" name="Submit" className="bg" />
                              </div>
                            </Col>
                          </Row>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ClientPassword;
