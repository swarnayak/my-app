import { Formik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";

function getLocalStorageData() {
  const data = localStorage.getItem("IsloggedIn");
  if (data) {
    return true;
  }
  return false;
}
const Login = () => {
  const [userLogin, setUserLogin] = useState(getLocalStorageData());
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter Email")
      .email("Please enter a valid email"),
    password: Yup.string().required("Please enter password"),
  });
  if (userLogin) {
    return navigate("/home");
  }

  if (loggedIn) {
    navigate("/home");
  }

  if (userLogin || invalidLogin) {
    return <Navigate to="/home" />;
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const getItem = JSON.parse(localStorage.getItem("data"));

        const emailExists =
          getItem && getItem.find((item) => item.email === values.email);
        console.log(emailExists);

        if (emailExists) {
          localStorage.setItem(
            "currentuser",
            JSON.stringify(emailExists.email)
          );
          setLoggedIn(true);
          setInvalidLogin(false);
          // setUserLogin(true)
          // navigate("/home");
          // alert('Successfully LogIn');
        } else {
          alert("recheck email or password");
          setInvalidLogin(true);
          setLoggedIn(false);
        }

        setSubmitting(false);

        setTimeout(() => {
          setLoggedIn("");
        }, 1000);

        setTimeout(() => {
          setInvalidLogin("");
        }, 1000);
      }}
    >
      {({ values, touched, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="container m-md-4  row  text-center  " style={{}}>
            <div className="col-md-7  d-flex justify-content-center align-items-center d-flex flex-column">
              <div className="">
                <img
                  src="./ba.jpg"
                  width={200}
                  className="img-thumbnail"
                  alt="logo"
                />
              </div>
              <div className="">
                <div>
                  <h3 className="font-Segoe UI">ShareMe Go </h3>
                </div>
                <div className="">
                  <p className="fw-lighter  ">
                    Happy to provide You My App Feature.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-5 text-start mt-5">
              <h1 className="text-center">LOGIN ACCOUNT </h1>
              <div className="m-2">
                <label>Email: </label>
                <input
                  type="email"
                  className=" form-control"
                  placeholder="email@gmail.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && errors.email}
              </div>

              <div className="m-2">
                <label>Password:</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className=" form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && errors.password}
              </div>

              <div className="text-center m-3">
                <button type="submit" className="btn btn-secondary text-center">
                  Submit
                </button>
              </div>

              <div className="text-center">
                <Link
                  className="text-decoration-none text-dark link-dark"
                  to="/register"
                >
                  Click For Registration
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;
