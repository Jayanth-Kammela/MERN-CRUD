// import React from "react"
// import { Formik, Form, Field } from "formik"
// import * as Yup from "yup"
// // import { TextField } from "formik-material-ui"
// import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, Input, InputLabel, MenuItem, Select } from "@mui/material"
// import { TextField } from "formik-material-ui"


// const initialValues = {
//     firstName: "",
//     lastName: "",
//     occupation: "",
//     city: "",
//     country: "",
//     email: "",
//     password: "",
// }

// const options = [
//     { label: "Computer Programmer", value: "Computer_programmer" },
//     { label: "Web Developer", value: "web_developer" },
//     { label: "User Experience Designer", value: "user_experience_designer" },
//     { label: "Systems Analyst", value: "systems_analyst" },
//     { label: "Quality Assurance Tester", value: "quality_assurance_tester" },
// ]

// //password validation
// const lowercaseRegEx = /(?=.*[a-z])/
// const uppercaseRegEx = /(?=.*[A-Z])/
// const numericRegEx = /(?=.*[0-9])/
// const lengthRegEx = /(?=.{6,})/


// let validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("Required").min(4),
//     lastName: Yup.string().required("Required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//     password: Yup.string()
//         .matches(
//             lowercaseRegEx,
//             "Must contain one lowercase alphabetical character!"
//         )
//         .matches(
//             uppercaseRegEx,
//             "Must contain one uppercase alphabetical character!"
//         )
//         .matches(numericRegEx, "Must contain one numeric character!")
//         .matches(lengthRegEx, "Must contain 6 characters!")
//         .required("Required!"),
// })

// const NewForm = () => {
//     const onSubmit = (values) => {
//         console.log(values)
//     }

//     return (
//         <Grid container justify="center" spacing={1}>
//             <Grid item md={6}>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={onSubmit}>
//                     {({ dirty, isValid, values, handleChange, handleBlur }) => {
//                         return (
//                             <Form>
//                                 <CardContent>
//                                     <Grid item container spacing={1} justify="center">
//                                         <Grid item xs={12} sm={6} md={6}>
//                                             <Field variant="outlined" fullWidth name="firstName" value={values.firstName} component={TextField} />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6} md={6}>
//                                             <Field label="Last Name" fullWidth name="lastName" value={values.lastName} component={TextField} />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6} md={6}>
//                                             <Field label="City" fullWidth name="city" value={values.city} component={TextField} />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6} md={6}>
//                                             <Field label="Country" fullWidth name="country" value={values.country} component={TextField} />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6} md={6}>
//                                             <Field label="Email" fullWidth name="email" value={values.email} component={TextField} />
//                                         </Grid>
//                                         <Grid item xs={12} sm={6} md={6}>
//                                             <Field label="Password" fullWidth name="password" value={values.password} type="password" component={TextField} />
//                                         </Grid>
//                                     </Grid>
//                                 </CardContent>
//                                 <CardActions>
//                                     <Button variant="contained" color="primary" type="Submit" > REGISTER </Button>
//                                 </CardActions>
//                             </Form>
//                         )
//                     }}
//                 </Formik>
//             </Grid>
//         </Grid>
//     )
// }

// export default NewForm



import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Input } from '@mui/material';

const NewForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setFormData({
            email: '',
            password: ''})
        console.log(formData);
    };

    return (
        <ValidatorForm
            onSubmit={handleSubmit}
        >
            <h2>Simple form</h2>
            <TextValidator
                label="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <br />

            <TextValidator
                label="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <br />
            <Button
                color="primary"
                variant="contained"
                type="submit"
            >Submit
            </Button>
        </ValidatorForm>
    );
};

export default NewForm;






