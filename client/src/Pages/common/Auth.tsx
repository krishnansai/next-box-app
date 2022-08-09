import { useFormik } from "formik";
import * as Yup from "yup";
import { _loguser, _registeruser } from "../../functions/authfunctions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Form } from "react-bootstrap";
import styled from "styled-components";
import style from "../../config/style";

const Auth = () => {
  const path = window.location.pathname;

  if (path === "/login") {
    return <Login />;
  }

  return <Register />;
};

// create login component
const Login = () => {
  const navigator = useNavigate();

  const notify = () => toast("You are Logged in!🔥");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      _loguser(values.email, values.password).then((res) => {
        const { status, redirectUrl, token, data } = res.data;

        if (status && redirectUrl) {
          notify();
          // sleep for 2 second
          setSubmitting(false);
          sessionStorage.setItem("NQi6OMGG0sa_7UW_noxIn1ZS0-XVk&d", "ok");
          sessionStorage.setItem("_URESID002@RASSO", data._id);
          sessionStorage.setItem("role", data.role);
          sessionStorage.setItem("token", token);
          if (window.location.hash === "") {
            navigator("/");
            window.location.reload();
          } else {
            let id = window.location.hash.split("#")[2];
            navigator(`/product/${id}`);
          }
        }
      });
    },
  });
  return (
    <>
      <LoginWrapper className="flex" id="auth">
        <Form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column align-items-center"
        >
          <Form.Group className="mb-3 w-40">
            <h3 className="mb-4">Login </h3>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3 w-40">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="username"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <button className="btn btn-primary mt-4" type="submit">
              Login
            </button>
          </Form.Group>
        </Form>
      </LoginWrapper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
      />
    </>
  );
};

const LoginWrapper = styled.div`
  background-color: #1b1c1b;
  width: 20%;
  margin: auto;
  border-radius: 20px;
  padding: 30px;
  box-shadow: ${style.colors.shadow};
  font-size: 1rem;

  .error {
    color: red;
    font-size: ${style.fontsize.error};
    padding-top: 4px;
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
    background-color: ${style.colors.accent};
  }
`;

const Register = () => {
  const navigator = useNavigate();

  const notify = () => toast("Registered Successful! Now You can Login!🔥");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must be 8 characters or more"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      _registeruser(values.email, values.password, values.username)
        .then((data) => {
          if (data.data.status) {
            notify();
            setTimeout(() => {
              setSubmitting(false);
              alert("Registered Successfully");
              navigator("/login");
            }, 1000);
          }
        })
        .catch((e) => console.log(e.response.data));
    },
  });
  return (
    <>
      <RegisterWrapper className="flex" id="auth">
        <Form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column align-items-center"
        >
          <Form.Group className="mb-3 w-40">
            <h3 className="mb-4">Register</h3>
            <Form.Label htmlFor="username">First Name</Form.Label>
            <Form.Control
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </Form.Group>{" "}
          <Form.Group className="mb-3 w-40">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </Form.Group>{" "}
          <Form.Group className="mb-3 w-40">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3 w-40">
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
            <button className="btn btn-primary mt-4" type="submit">
              Register
            </button>
          </Form.Group>
        </Form>
      </RegisterWrapper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
      />
    </>
  );
};

const RegisterWrapper = styled.div`
  background-color: #1b1c1b;
  width: 25%;
  margin: auto;
  border-radius: 20px;
  padding: 30px;
  box-shadow: ${style.colors.shadow};

  .error {
    color: red;
    font-size: ${style.fontsize.error};
    padding-top: 4px;
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
    background-color: ${style.colors.accent};
  }
`;

export default Auth;
