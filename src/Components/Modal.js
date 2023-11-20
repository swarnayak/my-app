import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function Modal() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [country, setcountry] = useState();
  const [selectCountry, setSelectCountry] = useState("");

  const [state, setState] = useState([]);
  const [selectState, setSelectState] = useState("");

  const [city, setCity] = useState([]);

  // const [selectedCountry, setSelectedCountry] = useState("");
  // const [selectedState, setSelectedState] = useState("");
  // const [selectedCity, setSelectedCity] = useState("");

  const [initialValues, setInitialValues] = useState({});
  // const [loading, setLoading] = useState(true);

  const getItem = JSON.parse(localStorage.getItem("patient")) || [];

  useEffect(() => {
    if (id) {
      const getItem = JSON.parse(localStorage.getItem("patient")) || [];
      const getData = getItem.find((data) => +data.id === +id);
      setInitialValues(getData);
      setSelectCountry(getData?.values?.Country || "");
      setSelectState(getData?.values?.State || "");
      // setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "aGd5VHRacFk2ZktKRXVLbDRaa3d2Wm1RU2VHY05KTDVCR1B6TjJEdA==",
        },
      })
      .then((data) => setcountry(data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectCountry) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectCountry}/states`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "aGd5VHRacFk2ZktKRXVLbDRaa3d2Wm1RU2VHY05KTDVCR1B6TjJEdA==",
            },
          }
        )
        .then((data) => setState(data.data));
    }
  }, [selectCountry]);

  useEffect(() => {
    if (selectState && selectCountry) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectCountry}/states/${selectState}/cities`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "aGd5VHRacFk2ZktKRXVLbDRaa3d2Wm1RU2VHY05KTDVCR1B6TjJEdA==",
            },
          }
        )
        .then((data) => setCity(data.data));
    }
  }, [selectCountry, selectState]);

  useEffect(() => {
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "aGd5VHRacFk2ZktKRXVLbDRaa3d2Wm1RU2VHY05KTDVCR1B6TjJEdA==",
        },
      })
      .then((data) => setcountry(data.data))
      .catch((error) => console.log(error));
  }, []);

  // useEffect(() => {
  //   if (selectedCountry) {
  //     axios
  //       .get(
  //         `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
  //         {
  //           headers: {
  //             "X-CSCAPI-KEY":
  //               "aGd5VHRacFk2ZktKRXVLbDRaa3d2Wm1RU2VHY05KTDVCR1B6TjJEdA==",
  //           },
  //         }
  //       )
  //       .then((data) => setState(data.data));
  //   }
  // }, [selectedCountry]);

  // useEffect(() => {
  //   if (selectedState && selectedCountry) {
  //     axios
  //       .get(
  //         `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`,
  //         {
  //           headers: {
  //             "X-CSCAPI-KEY":
  //               "aGd5VHRacFk2ZktKRXVLbDRaa3d2Wm1RU2VHY05KTDVCR1B6TjJEdA==",
  //           },
  //         }
  //       )
  //       .then((data) => setCity(data.data));
  //   }
  // }, [selectedCountry, selectedState]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter Full name"),
    DOB: Yup.string()
      .required("Please enter DOB")
      .test("valid-date", "Please enter a valid date", (value) =>
        Yup.date().isValidSync(value)
      ),

    Age: Yup.number().required("Please enter Age"),
    Address1: Yup.string().required("Please enter Address1"),
    Address2: Yup.string().required("Please enter Address2"),
    // State: Yup.string().required("Please enter State"),
    // City: Yup.string().required("Please enter City"),
    Zipcode: Yup.string().required("Please enter Zipcode"),
  });

  return (
    <>
      <Navbar />

      {/* {loading ? (
        <div class="spinner-border" role="status">
          <span class="sr-only" />
        </div>
      ) : ( */}
      <Formik
        enableReinitialize={initialValues}
        initialValues={{
          name: id ? initialValues.values?.name : "",
          DOB: id ? initialValues.values?.DOB : "",
          Age: id ? initialValues.values?.Age : "",
          Address1: id ? initialValues.values?.Address1 : "",
          Address2: id ? initialValues.values?.Address2 : "",
          State: id ? initialValues.values?.State : "",
          City: id ? initialValues.values?.City : "",
          Country: id ? initialValues.values?.Country : "",
          Zipcode: id ? initialValues.values?.Zipcode : "",
          // Country: id ? initialValues.values?.Country : selectedCountry,
          // State: id ? initialValues.values?.State : selectedState,
          // City: id ? initialValues.values?.City : selectedCity,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // const getCountryName = country.find(
          //   (data) => data.iso2 === values.Country
          // ).name;

          if (id) {
            const updatedArray = getItem.map((item) =>
              +item.id === +id ? { id: item.id, values } : item
            );

            localStorage.setItem("patient", JSON.stringify(updatedArray));
            navigate("/patient-info");
          } else {
            const emailExists =
              getItem && getItem.find((item) => item.name === values.name);

            if (emailExists) {
              alert("Already a Patient");
            } else {
              localStorage.setItem(
                "patient",
                JSON.stringify([
                  ...getItem,
                  { id: new Date().getTime(), values },
                ])
              );
              navigate("/patient-info");
            }
          }
          setSubmitting(false);
        }}
      >
        {({ values, touched, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row mt-5">
              <div className="col ms-5">
                <div className="m-1">
                  {/* <label className="text-start"> name:</label> */}
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Full name"
                    className=" form-control form-control-sm"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && errors.name}
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> DOB:</label> */}
                  <input
                    name="DOB"
                    type="DOB"
                    placeholder="Enter your DOB"
                    className="form-control form-control-sm"
                    value={values.DOB}
                    onChange={handleChange}
                  />
                  {errors.DOB && touched.DOB && errors.DOB}
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> Age:</label> */}
                  <input
                    name="Age"
                    type="Age"
                    placeholder="Enter your Age"
                    className=" form-control form-control-sm"
                    value={values.Age}
                    onChange={handleChange}
                  />
                  {errors.Age && touched.Age && errors.Age}
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> Address1:</label> */}
                  <input
                    name="Address1"
                    type="text"
                    placeholder="Enter your Address1"
                    className="form-control form-control-sm"
                    value={values.Address1}
                    onChange={handleChange}
                  />
                  {errors.Address1 && touched.Address1 && errors.Address1}
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> Address2:</label> */}
                  <input
                    name="Address2"
                    type="text"
                    placeholder="Enter your Address2"
                    className="form-control form-control-sm"
                    value={values.Address2}
                    onChange={handleChange}
                  />
                  {errors.Address2 && touched.Address2 && errors.Address2}
                </div>

                <div className="m-1">
                  <select
                    name="Country"
                    id="Country"
                    className="form-control  form-control-sm "
                    value={values?.Country}
                    // value={selectedCountry}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectCountry(e.target.value);
                    }}
                  >
                    <option className="form-control text-muted" value="">
                      Country
                    </option>
                    {/* {country ?.map((item) => (
                      <option key={item.iso2} value={item.iso2}>
                        {item.name}
                      </option>
                    ))} */}
                    {country &&
                      country.length &&
                      country.map((item) => {
                        return <option value={item.iso2}>{item.name}</option>;
                      })}
                  </select>
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> State:</label> */}
                  <select
                    name="State"
                    id="State"
                    value={values?.State}
                    className="form-control form-control-sm"
                    // value={selectedState}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectState(e.target.value);
                    }}
                  >
                    <option className="form-control text-muted" value="">
                      State
                    </option>
                    {state &&
                      state.length &&
                      state.map((item) => {
                        return <option value={item.iso2}>{item.name}</option>;
                      })}
                    {/*
                    {state?.map((item) => (
                      <option key={item.iso2} value={item.iso2}>
                        {item.name}
                      </option>
                    ))} */}
                  </select>
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> City:</label> */}
                  <select
                    name="City"
                    id="City"
                    value={values?.City}
                    // value={selectedCity}
                    className="form-control form-control-sm"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option
                      className="form-control text-muted form-control-sm"
                      value=""
                    >
                      City
                    </option>
                    {city &&
                      city.length &&
                      city.map((item) => {
                        return <option value={item.iso2}>{item.name}</option>;
                      })}

                    {/* {city?.map((item) => (
                      <option key={item.iso2} value={item.iso2}>
                        {item.name}
                      </option>
                    ))} */}
                  </select>
                  {errors.City && touched.City && errors.City}
                </div>

                <div className="m-1">
                  {/* <label className="text-start"> Zipcode:</label> */}
                  <input
                    name="Zipcode"
                    type="Zipcode"
                    placeholder="Enter your Zipcode"
                    className="form-control form-control-sm"
                    value={values.Zipcode}
                    onChange={handleChange}
                  />
                  {errors.Zipcode && touched.Zipcode && errors.Zipcode}
                </div>
                <br />

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-secondary rounded-pill btn-sm"
                  >
                    {id ? "Update" : "SAVE"}
                  </button>
                </div>
              </div>

              <div className="col  d-flex flex-column  justify-content-center align-items-center">
                <div className="">
                  {/* <img
                    src="./ba.jpg"
                    width={200}
                    className="img-thumbnail"
                    alt="logo"
                  /> */}
                  {id ? (
                    <div>
                      <img
                        src="./ba.jpg"
                        width={200}
                        className="img-thumbnail"
                        alt="Update"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src="./ba.jpg"
                        width={200}
                        className="img-thumbnail"
                        alt="logo"
                      />
                    </div>
                  )}
                </div>
                <div className=" d-flex flex-column justify-content-center align-items-center">
                  <div>
                    <h3 className="font-Segoe UI">ShareMe Go </h3>
                  </div>
                  <div className="align-items-center">
                    <p className="fw-lighter">
                      Happy to provide You My App Feature.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {/* )} */}
    </>
  );
}
