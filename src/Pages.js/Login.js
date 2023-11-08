import { Formik } from 'formik';
import { Link, redirect, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const Login = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string() .required("Please enter Email") .email("Please enter a valid email"),
    password: Yup.string().required("Please enter password"),
});



  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}

      onSubmit={(values, { setSubmitting }) => {

        const getItem = JSON.parse(localStorage.getItem('login-credential'));

        const emailExists = getItem && getItem.find(item => item.email === values.email);
        console.log(emailExists)

        if (emailExists) {
          navigate('/home')
          // alert('Successfully LogIn');
        } else {
          alert('recheck email or password');
        }

        setSubmitting(false);

      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='container m-md-5  row  text-center  ' style={{}}>
            <div className='col-md-7 d-flex justify-content-center align-items-center d-flex flex-column' >
              <div className=''>
                <img src='./pngegg.png' width={150} className='' />
              </div>
              <div>
              <div><h3 className='font-Segoe UI'>ShareMe Go </h3></div>
              <div><p className='fw-lighter'>Thanks for choosing me, happy to provide You My App Feature.</p></div>
              </div>
            </div>

            <div className='col-md-5 text-start'>
              <h1>Welcome to Log In </h1>
              <div>
                <label>Email: </label>
                <input type='email' className=' form-control' name="email" value={values.email} onChange={handleChange} />
                {errors.email && touched.email && errors.email}
              </div>

              <br /><br />

              <div>
                <label>Password:</label>
                <input name="password" type='password' className=' form-control' value={values.password} onChange={handleChange} />
                {errors.password && touched.password && errors.password}
              </div>

              <br /><br />

              <div className='text-center'>
                <button type='submit' className='btn btn-secondary text-center'>Submit</button>
              </div>
              <br/>
              <div className='text-center'>
              <Link className='text-decoration-none text-dark' to='/'>Click For Registration</Link>
            </div>
            </div>

            
          </div>

        </form>
      )}
    </Formik>
  );
}

export default Login


