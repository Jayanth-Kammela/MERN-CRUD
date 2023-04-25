import React, { useState } from "react";
import "../index.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Box, ThemeProvider, Container, FormGroup, FormControl, createTheme } from '@mui/material';

{/* <ThemeProvider theme={theme}>
  <Box sx={{ margin: 8 }}>
    <TextField variant="outlined" label="Email"
      InputProps={{
        style: {
          width: "400px",
          height: "60px"
        }
      }}
    />
  </Box>
</ThemeProvider> */}
const Login = () => {
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

  const nav = useNavigate()
  const [user, setUser] = useState({ email: "", password: "", });

  const forChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const forLogin = () => {
    const { email, password } = user;
    if (email === "" || password === "") {
      return toast.error("Fill All Details", { theme: "colored" });
    }
    axios.post("http://localhost:3000/users/login", user, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      const msg = 'Login Successfully'
      toast.success(`${msg}`, {
        theme: "colored",
      });
      nav('/all')
    })
      .catch((err) => {
        toast.error(`${err.response.data.message} or Please enter the valid credentials`, { theme: "colored" });
      });
  };

  return (
    <>
      <div className="">

        <div className="">
          <Container maxWidth="xs" className="edit shadow-lg">
            <Box mx={0} px={2} py={6}>
              <h4 className="text-center">Log in</h4>
              <ThemeProvider theme={theme}>
                <FormGroup >
                  <FormControl>
                    <TextField name="email" InputProps={{
                      style: {
                        width: "340px",
                        height: "42px",
                        margin: '12px'
                      }
                    }} type="email" placeholder="Enter Email Address" onChange={forChange} />
                  </FormControl>
                  <FormControl>
                    <TextField name="password" InputProps={{
                      style: {
                        width: "340px",
                        height: "42px",
                        margin: '12px'
                      }
                    }} type="password" placeholder="Enter Password" onChange={forChange} />
                  </FormControl>
                  <FormControl>
                    <Button variant="contained" style={{
                      width: "340px",
                      color: 'white',
                      height: "40px",
                      margin: '12px'
                    }} type="button" onClick={forLogin} >Login in</Button>
                  </FormControl>
                  <Box mx={4}>
                    Don't have an Account<Link to="/signup"> Sign Up </Link>
                  </Box>
                </FormGroup>
              </ThemeProvider>
            </Box>
          </Container>
        </div>

        <div className="child">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00E09E" fillOpacity="1" d="M0,32L80,37.3C160,43,320,53,480,96C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        </div>

      </div>
    </>
  );
};

export default Login;


