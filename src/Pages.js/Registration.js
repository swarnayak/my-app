import { Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';


const Register = () => {
    const [soak,setsoak]=useState('');

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter Name"),
        email: Yup.string() .required("Please enter Email") .email("Please enter a valid email"),
        userName: Yup.string().required("Please enter username"),
        password: Yup.string().required("Please enter password"),
    });

    return (
        <Formik
            initialValues={{ name: '', userName: '', email: '', password: '' }}

            validationSchema={validationSchema}

            onSubmit={(values, { setSubmitting }) => {
                const getItem = JSON.parse(localStorage.getItem('data'));

                const emailExists = getItem && getItem.find(item => item.email === values.email);
                // const emailExists = getItem && getItem.filter(item => item.email === values.email)[0];


                if (emailExists) {
                    setsoak('Click on Login')
                } else {
                    localStorage.setItem('data', JSON.stringify(getItem ? [...getItem, values] : [values]));
                    setsoak('User successfully registerd.')
                }

                setTimeout(()=>{
                    setsoak(null);
                },2500);

                setSubmitting(false);
            }}
        >

            {({ values, touched, errors, handleChange, handleSubmit }) => (

                <form onSubmit={handleSubmit}>

                    <div className='container m-md-5  row  text-center' style={{ }}>
                        <div className='col-md-7  d-flex justify-content-center align-items-center d-flex flex-column' >
                            <div className=''>
                                <img src='./ba.jpg' width={200} className='img-thumbnail' />
                            </div>
                            <div className=''>
                            <div><h3 className='font-Segoe UI'>ShareMe Go </h3></div>
                            <div><p className='fw-lighter'>Thanks for choosing me, happy to provide You My App Feature.</p></div>
                            </div>
                        </div>

                        <div className='col-md-5 text-start border border-dark rounded'>
                            <h1 className='text-center'>REGISTER</h1>

                            <div className=''>
                                <label className='text-start'> Name:</label>
                                <input name="name" type='name' placeholder='Your Full Name' className=' form-control' value={values.name} onChange={handleChange} />
                                {errors.name && touched.name && errors.name}
                            </div>

                            <br />

                            <div className=''>
                                <label className='text-start'> UserName:</label>
                                <input name="userName" type='useName' placeholder='Username' className='form-control' value={values.userName} onChange={handleChange} />
                                {errors.userName && touched.userName && errors.userName}

                            </div>

                            <br />

                            <div className=''>
                                <label className='text-start'> Email:</label>
                                <input name="email" type='email' placeholder='Email' className=' form-control' value={values.email} onChange={handleChange} />
                                {errors.email && touched.email && errors.email}

                            </div>

                            <br />

                            <div className=''>
                                <label className='text-start'> Password:</label>
                                <input name="password" type='password' placeholder='Password' className='form-control' value={values.password} onChange={handleChange} />
                                {errors.password && touched.password && errors.password}

                            </div>

                            <br />

                            {soak !== '' && <h4 className='text-center'>{soak}</h4> }

                            <div className='text-center'>
                                <button type='submit' className='btn btn-secondary rounded-pill' onClick={()=>{setsoak(!soak)}}>CREATE ACCOUNT</button>
                            </div>

                            <br />
                            {/* {soak && (<div className='text-center'>
                            <p>Successfully Register</p></div>)} */}

                            <div className='text-center'>
                                <Link className='text-decoration-none text-dark' to='/Login'>Login</Link>
                            </div>
                        </div>
                    </div>

                </form>
            )}
        </Formik>
    );
}

export default Register;

