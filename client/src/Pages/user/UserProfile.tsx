import { Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import style from "../../config/style";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./user.style.scss";

import { useFormik } from "formik";
import * as Yup from "yup";
import { addUserProfile } from "../../functions/commonfunctions";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import LoadingPage from "../common/LoadingPage";

const UserProfile = () => {
  const [show, setShow] = useState(false);

  const notify = (e: string) => toast(e);

  const { error, loading, response: data } = useFetch("/user/getuserinfo", {});

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      postCode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Username must be 15 characters or less")
        .required("Required"),
      phone: Yup.string()
        .min(10, "Phone no must be 10 digits")
        .max(10, "Phone no must be 10 digits")
        .required("Required"),
      address: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      postCode: Yup.string()
        .min(6, "Zip code must be 6 digits")
        .max(6, "Zip code must be 6 digits")
        .required("Required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addUserProfile(values).then((e: any) => {
        notify(e.data.message[0]);
        resetForm();
        handleClose();
        setSubmitting(false);
      });
    },
  });

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };
  const handleShow = () => {
    setShow(true);
    formik.setFieldValue("firstName", data.name);
    formik.setFieldValue("email", data.email);
    formik.setFieldValue("phone", data.phone);
    formik.setFieldValue("address", data.address);
    formik.setFieldValue("state", data.state);
    formik.setFieldValue("postCode", data.postCode);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="modal-custom"
      >
        <UserProfilFormWrapper>
          <Form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column align-items-start"
          >
            <Form.Group className="mb-3 w-40">
              <h3
                className="mb-4"
                style={{
                  letterSpacing: "1px",
                }}
              >
                Edit Profile{" "}
              </h3>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 w-40">
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                id="phone"
                type="number"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 w-40">
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                id="address"
                type="text"
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 w-40">
              <Form.Label htmlFor="state">State</Form.Label>
              <Form.Control
                id="state"
                type="text"
                {...formik.getFieldProps("state")}
              />
              {formik.touched.state && formik.errors.state ? (
                <div className="error">{formik.errors.state}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 w-40">
              <Form.Label htmlFor="postCode">Post Code</Form.Label>
              <Form.Control
                id="postCode"
                type="number"
                {...formik.getFieldProps("postCode")}
              />
              {formik.touched.postCode && formik.errors.postCode ? (
                <div className="error">{formik.errors.postCode}</div>
              ) : null}
              <div className="div">
                <button className="btn btn-primary mt-4" type="submit">
                  Save Profile
                </button>
                <button
                  className="btn btn-danger mt-4"
                  onClick={() => handleClose()}
                  type="button"
                >
                  Close
                </button>
              </div>
            </Form.Group>
          </Form>
        </UserProfilFormWrapper>
      </Modal>

      <div
        className="cont"
        style={{
          marginTop: "100px",
        }}
      >
        <UserProfileWrapper>
          <div className="top-pos">
            <h4>Profile</h4>
            <button className="edit" onClick={() => handleShow()}>
              Edit <FaEdit />
            </button>
          </div>
          <div className="user-info">
            <div className="user-img">
              {/* <img src={userImg} alt="user" /> */}
            </div>
            <div className="user-details">
              <h5> {data && data.name}</h5>
              <p>Email : {data && data.email}</p>
              <p>Phone : {data && data.phone}</p>
              <p>Address : {data && data.address}</p>
              <p>State : {data && data.state}</p>
              <p>Zip : {data && data.postCode}</p>
            </div>
          </div>
        </UserProfileWrapper>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
      />
    </>
  );
};

const UserProfileWrapper = styled.div`
  width: 70%;
  margin: auto;
  color: white;
  background-color: #1b1b1b;
  margin: auto;
  height: 50%;
  border-radius: 20px;
  padding: 30px;
  box-shadow: ${style.colors.shadow};

  .top-pos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .edit {
    border-radius: 10px;
  }
`;

const UserProfilFormWrapper = styled.div`
  width: 80%;
  margin: auto;
  border-radius: 20px;
  padding: 30px;
  background-color: #1b1b1b;

  .modal-content {
    input {
      width: 100%;
    }
  }

  .error {
    color: red;
    font-size: ${style.fontsize.error};
    padding-top: 8px;
  }

  h3 {
    font-family: ${style.fontfamily.heading};
    color: white;
    letter-spacing: 1px;
  }

  label {
    color: white;
  }

  button {
    border: none;

    &:first-child {
      background-color: ${style.colors.accent};
      margin-right: 10px;
    }
  }
`;

export default UserProfile;
