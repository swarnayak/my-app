import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
// import { useState } from "react";
export default function Modal() {
  // const [Patient, setPatient] = useState("");

  const validationSchema = Yup.object({
    Name: Yup.string().required("Please enter Full Name"),
    DOB: Yup.string()
      .required("Please enter DOB")
      .test("valid-date", "Please enter a valid date", (value) =>
        Yup.date().isValidSync(value)
      ),

    Age: Yup.number().required("Please enter Age"),
    Address1: Yup.string().required("Please enter Address1"),
    Address2: Yup.string().required("Please enter Address2"),
    State: Yup.string().required("Please enter State"),
    City: Yup.string().required("Please enter City"),
    Zipcode: Yup.string().required("Please enter Zipcode"),
  });

  return (
    <Formik
      initialValues={{
        Name: "",
        DOB: "",
        Age: "",
        Address1: "",
        Address2: "",
        State: "",
        City: "",
        Country: "",
        Zipcode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const getItem = JSON.parse(localStorage.getItem("Pateient"));

        const emailExists =
          getItem && getItem.find((item) => item.Name === values.Name);

        if (emailExists) {
          alert("Already a Patient");
        } else {
          localStorage.setItem(
            "Pateient",
            JSON.stringify(getItem ? [...getItem, values] : [values])
          );
        }
        setSubmitting(false);
      }}
    >
      {({ values, touched, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="container m-md-5  row  text-center" style={{}}>
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
                <div>
                  <p className="fw-lighter">
                    Happy to provide You My App Feature.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-5 text-start ">
              <h1 className="text-center">Dashboard</h1>

              <div className="">
                {/* <label className="text-start"> Name:</label> */}
                <input
                  name="Name"
                  type="Name"
                  placeholder="Your Full Name"
                  className=" form-control"
                  value={values.Name}
                  onChange={handleChange}
                />
                {errors.Name && touched.Name && errors.Name}
              </div>

              <br />

              <div className="">
                {/* <label className="text-start"> DOB:</label> */}
                <input
                  name="DOB"
                  type="DOB"
                  placeholder="Enter your DOB"
                  className="form-control"
                  value={values.DOB}
                  onChange={handleChange}
                />
                {errors.DOB && touched.DOB && errors.DOB}
              </div>

              <br />

              <div className="">
                {/* <label className="text-start"> Age:</label> */}
                <input
                  name="Age"
                  type="Age"
                  placeholder="Enter your Age"
                  className=" form-control"
                  value={values.Age}
                  onChange={handleChange}
                />
                {errors.Age && touched.Age && errors.Age}
              </div>

              <br />

              <div className="">
                {/* <label className="text-start"> Address1:</label> */}
                <input
                  name="Address1"
                  type="Address1"
                  placeholder="Enter your Address1"
                  className="form-control"
                  value={values.Address1}
                  onChange={handleChange}
                />
                {errors.Address1 && touched.Address1 && errors.Address1}
              </div>

              <br />

              <div className="">
                {/* <label className="text-start"> Address2:</label> */}
                <input
                  name="Address2"
                  type="Address2"
                  placeholder="Enter your Address2"
                  className="form-control"
                  value={values.Address2}
                  onChange={handleChange}
                />
                {errors.Address2 && touched.Address2 && errors.Address2}
              </div>
              <br />

              <div className="">
                {/* <label className="text-start"> State:</label> */}
                <input
                  name="State"
                  type="State"
                  placeholder="Enter your State"
                  className="form-control"
                  value={values.State}
                  onChange={handleChange}
                />
                {errors.State && touched.State && errors.State}
              </div>
              <br />

              <div className="">
                {/* <label className="text-start"> City:</label> */}
                <input
                  name="City"
                  type="City"
                  placeholder="Enter your City"
                  className="form-control"
                  value={values.City}
                  onChange={handleChange}
                />
                {errors.City && touched.City && errors.City}
              </div>
              <br />

              <div className="">
                {/* <label className="text-start"> Zipcode:</label> */}
                <input
                  name="Country"
                  type="Country"
                  placeholder="Enter your Country"
                  className="form-control"
                  value={values.Country}
                  onChange={handleChange}
                />
                {errors.Zipcode && touched.Zipcode && errors.Zipcode}
              </div>
              <br />

              <div className="">
                {/* <label className="text-start"> Zipcode:</label> */}
                <input
                  name="Zipcode"
                  type="Zipcode"
                  placeholder="Enter your Zipcode"
                  className="form-control"
                  value={values.Zipcode}
                  onChange={handleChange}
                />
                {errors.Zipcode && touched.Zipcode && errors.Zipcode}
              </div>
              <br />

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-secondary rounded-pill"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
