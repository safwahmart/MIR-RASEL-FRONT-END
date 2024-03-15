import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { H4 } from "@/components/reuseComponents/Tags";
import SWButton from "@/components/reuseComponents/SWButton";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { SWInput, SWLabel } from "@/components/reuseComponents/SWInput";

const initialValues = {
  name: "",
  institute_name: "",
  email: "",
  phone: "",
  address: "",
  corporate_order_note: "",
  image: null,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  institute_name: Yup.string().required("Institute Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  corporate_order_note: Yup.string().required("Note is required"),
});

const FormSubmit = ({ formType }) => {
  const router = useRouter();

  const getApiEndpoint = () => {
    switch (formType) {
      case "corporate":
        return `${baseUrl}/saveCorporate`;
      case "order":
        return `${baseUrl}/saveOrderByPicture`;
      case "appointment":
        return `${baseUrl}/saveAppointment`;
      default:
        return "";
    }
  };

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("institute_name", values.institute_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("corporate_order_note", values.corporate_order_note);

      const response = await axios.post(getApiEndpoint(), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.success("Form submitted successfully.");
        router.push("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  const noteFieldName =
    formType === "corporate"
      ? "Corporate note"
      : formType === "order"
      ? "Order note"
      : "Appointment note";

  return (
    <section className="sw__checkout__page sw__top__gaps">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="sw__checkout__left">
              <H4
                h4={`${
                  formType == "corporate"
                    ? "This is a corporate order from."
                    : formType == "order"
                    ? "This is a  order from. "
                    : "This is a appointment from. "
                } You have to fillup our from so that we can contact with you or your company to fulfill your company needs. We will contact with you soon.`}
              />
              {/* {formType == 'corporate' ? 'c' : formType == 'order' ? 'o' : 'a'} */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={6}>
                        <SWLabel name="Name" star="*" />
                        <SWInput
                          type="text"
                          placeholder=""
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          name="name"
                        />
                        <ErrorMessage name="name" component="div" />
                      </Col>

                      <Col lg={6}>
                        <SWLabel name="Institute Name" star="*" />
                        <SWInput
                          type="text"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.institute_name}
                          name="institute_name"
                        />
                        <ErrorMessage name="institute_name" component="div" />
                      </Col>

                      <Col lg={6}>
                        <SWLabel name="Email" star="*" />
                        <SWInput
                          type="email"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          name="email"
                        />
                        <ErrorMessage name="email" component="div" />
                      </Col>

                      <Col lg={6}>
                        <SWLabel name="Phone" star="*" />
                        <SWInput
                          type="text"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          name="phone"
                        />
                        <ErrorMessage name="phone" component="div" />
                      </Col>

                      <Col lg={6}>
                        <SWLabel name="Address" star="*" />
                        <SWInput
                          type="text"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          name="address"
                        />
                        <ErrorMessage name="address" component="div" />
                      </Col>

                      <Col lg={12}>
                        <SWLabel name={noteFieldName} star="*" />
                        <div className="sw__custom__input">
                          <textarea
                            name="corporate_order_note"
                            rows="5"
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.corporate_order_note}
                          />
                        </div>
                        <ErrorMessage
                          name="corporate_order_note"
                          component="div"
                        />
                      </Col>

                      <Col lg={12}>
                        <SWLabel name="Upload image" star="*" />
                        <div className="sw__custom__input">
                          <input
                            type="file"
                            name="image"
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={handleBlur}
                          />
                          {errors.image && touched.image && (
                            <div className="error">{errors.image}</div>
                          )}
                        </div>
                      </Col>

                      <Col lg={12}>
                        <div className="sw__custom__input">
                          <SWButton
                            name="Submit"
                            className="bg"
                            type="submit"
                            disabled={isSubmitting}
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="sw__custom__input"></div>
                      </Col>
                    </Row>
                  </form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FormSubmit;
