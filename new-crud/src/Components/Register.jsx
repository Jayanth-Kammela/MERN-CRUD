import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: 'rgba(37,175,57,0.93)',
      },
      secondary: {
        main: '#f50057',
      },
      text: {
        primary: '#000000',
      }
    }
  });
  const [user, setUser] = useState({
    // username: "",
    email: "",
    // phone: "",
    password: "",
  });

  const registerFormHandler = (event) => {
    // const { name, value } = event.target;
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const forRegister = () => {
    const { username, useremail, phone, password } = user;

    if (
      useremail === "" ||
      password === ""
    ) {
      return toast.error("Fill All Details", { theme: "colored" });
    } 
    console.log(user);


    axios
      .post("http://localhost:3000/users/signup", user)
      .then((res) => {
        console.log(user);
        toast.success(res.data.message, {
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { theme: "colored" });
      });
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="offset-4 col-lg-4 p-5 shadow-lg">
            <h4 className="text-center">Register</h4>
            <div className="my-5">
              <ThemeProvider theme={theme}>
                <form>
                  <div className="mb-4">
                    <TextField
                      name="email"
                      InputProps={{
                        style: {
                          width: "340px",
                          height: "42px"
                        }
                      }}
                      // value={user.useremail}
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                      onChange={registerFormHandler}
                    />
                  </div>
                  <div className="mb-4">
                    <TextField
                      name="password"
                      InputProps={{
                        style: {
                          width: "340px",
                          height: "42px"
                        }
                      }}
                      // value={user.password}
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      onChange={registerFormHandler}
                    />
                  </div>
                  <Button variant="contained"
                    type="button"
                    style={{
                      width: "340px",
                      color: 'white',
                      height: "40px",
                    }}
                    onClick={forRegister}
                  >
                    Signup
                  </Button>
                  <div className="text-center">
                    <p className="mt-3 mb-3">
                      Already have an account&nbsp; &nbsp;
                      <Link to="/"> Sign In</Link>
                    </p>
                  </div>
                </form>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
