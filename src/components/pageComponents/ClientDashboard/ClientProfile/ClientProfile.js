import SWButton from "@/components/reuseComponents/SWButton";
import { SWInput } from "@/components/reuseComponents/SWInput";
import { P } from "@/components/reuseComponents/Tags";
import { Col, Container, Form, Row } from "react-bootstrap";
import ClientSidebar from "../ClientSidebar";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import toast from "react-hot-toast";
import { headers } from "@/api/auth";

const ClientProfile = () => {
  const [userData, setUserData] = useState({})
  const [districts, setDistricts] = useState([])
  const [countries, setCountries] = useState([])
  const [customer, setCustomer] = useState({})
  const [areas, setAreas] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      setUserData(user);
      getCustomerForUser(user);
    }
    getDistricts();
    getCountries();
  }, [])

  const getCustomerForUser = async (user) => {
    const response = await axios.get(`${baseUrl}/customerForUser/${user.id}`, { headers: headers });
    setCustomer(response.data);
    getArea(response.data.district)
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
  console.log('profile',customer)
  return (
    <>
      <div className="sw__client__dashboard__gaps">
        <Container>
          <Row>
            <Col lg={3}>
              <ClientSidebar />
            </Col>
            <Col lg={9}>
              <div className="sw__client__dashboard__home">
                <h3>
                  <i className="flaticon-user-2"></i> Profile
                </h3>
                <div className="sw__client__dashboard__profile">
                  {customer !== null && Object.keys(customer).length > 0 && <Formik
                    initialValues={{
                      name: customer.name,
                      email: customer?.email,
                      phone: customer?.phone,
                      country: customer?.country,
                      district: customer?.district,
                      area: customer?.area,
                      zip_code: customer?.zip_code,
                      address: customer?.address,
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required('Please Enter a name'),
                      phone: Yup.number().required('Please Enter a Phone Number'),
                      country: Yup.number().required('Please Select Country'),
                      district: Yup.number().required('Please Select District'),
                      area: Yup.number().required('Please Select Area'),
                      zip_code: Yup.string().required('Please Enter Zip Code'),
                      address: Yup.string().required('Please Enter address'),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                      try {
                        const formData = new FormData();
                        formData.append('name', values.name);
                        formData.append('phone', values.phone ?? '');
                        formData.append('address', values.address ?? '');
                        formData.append('country', values.country ?? '');
                        formData.append('district', values.district ?? '');
                        formData.append('area', values.area ?? '');
                        formData.append('zip_code', values.zip_code ?? '');
                        formData.append('_method', 'PUT');
						if (values.photo) {
							debugger;
							formData.append('photo', values.photo);
						}
                        const response = await axios.post(`${baseUrl}/customers/${customer.id}`, formData, { headers: headers });

                        if (response.data) {
                          toast.success("Info Updated");
                        } else {
                          toast.error(response.data.message)
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values,setFieldValue }) => (
                      <form noValidate onSubmit={handleSubmit}>
                        <Row>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Name" />
                              <div className="sw__custom__input">
                                <input
                                  type="text"
                                  placeholder="name"
                                  name="name"
                                  required onChange={handleChange} onBlur={handleBlur} value={values.name}
                                />
                                {errors.name && touched.name && errors.name}
                              </div>
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Phone number" />
                              <div className="sw__custom__input">
                                <input
                                  type="text"
                                  placeholder="Phone"
                                  name="phone"
                                  required onChange={handleChange} onBlur={handleBlur} value={values.phone}
                                />
                                {errors.phone && touched.phone && errors.phone}
                              </div>
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Email" />
                              <SWInput
                                type="email"
                                placeholder="Email"
                                disable
                                name=""
                                value={values.email}
                              />
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Country" />
                              <Form.Select aria-label="Default select example" onChange={handleChange}
                                onBlur={handleBlur} value={values.country} name="country">
                                <option>Select Country</option>
                                {countries?.map((data, i) => (<option key={i} value={data.id}>{data.country_name}</option>))}
                              </Form.Select>
                              {errors.country && touched.country && errors.country}
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="District" />
                              <Form.Select aria-label="Default select example" onChange={(e) => { handleChange(e); getArea(e.target.value) }} onBlur={handleBlur} value={values.district} name="district">
                                <option>Select District</option>
                                {districts?.map((data, i) => (<option key={i} value={data.id}>{data.name}</option>))}
                              </Form.Select>
                              {errors.district && touched.district && errors.district}
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Area" />
                              <Form.Select aria-label="Default select example" onChange={handleChange}
                                onBlur={handleBlur} value={values.area} name="area">
                                <option>Select Area</option>
                                {areas?.map((data, i) => (<option key={i} value={data.id}>{data.name}</option>))}
                              </Form.Select>
                              {errors.area && touched.area && errors.area}
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Address" />
                              <div className="sw__custom__input">
                                <textarea
                                  name="address"
                                  rows="5"
                                  placeholder="Address"
                                  onChange={handleChange}
                                  onBlur={handleBlur} value={values.address}
                                ></textarea>
                                {errors.address && touched.address && errors.address}
                              </div>
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Zip Code" />
                              <div className="sw__custom__input">
                                <input
                                  type="text"
                                  placeholder="zip_code"
                                  name="zip_code"
                                  required onChange={handleChange} onBlur={handleBlur} value={values.zip_code}
                                />
                                {errors.zip_code && touched.zip_code && errors.zip_code}
                              </div>
                            </div>
                          </Col>
                          {/* item */}
                          <Col sm={6} lg={6}>
                            <div className="form__item">
                              <P p="Photo" />
                              <div className="sw__custom__input">
                                <input
                                  type="file"
                                  name="photo"
                                  required onChange={(e)=>setFieldValue('photo',e.target.files[0])} onBlur={handleBlur}
                                />
                                {errors.photo && touched.photo && errors.photo}
                              </div>
                            </div>
                          </Col>

                          {/* item */}
                          <Col lg={12}>
                            <div className="form__item">
                              <SWButton name="Submit" type="submit" className="bg" />
                            </div>
                          </Col>
                        </Row>
                      </form>
                    )}
                  </Formik>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ClientProfile;
