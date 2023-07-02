import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
import { Box, ThemeProvider, Container, createTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

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
    <React.Fragment>
      <Box className="">

        <Container maxWidth="xs" className="edit shadow-lg">
          <Box mx={0} px={2} py={6}>
            <h4 className="text-center">Log in</h4>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                  <Box component="form" sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="email" placeholder="Email" onChange={forChange} name="email"
                      InputProps={{
                        style: {
                          height: "2.6em",
                        }
                      }} />
                    <TextField margin="normal" required fullWidth name="password" type="password" id="password" placeholder="Password" onChange={forChange}
                      InputProps={{
                        style: {
                          height: "2.6em",
                        }
                      }} />
                    <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={forLogin}
                      style={{
                        color: 'white',
                        height: "2.6em",
                      }} >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                      Don't have an account?<Link to="/signup" variant="body2">
                          {"Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </Container>

        <div className="child">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(37,175,57,0.93)" fillOpacity="1" d="M0,32L80,37.3C160,43,320,53,480,96C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        </div>

      </Box>
    </React.Fragment>
  );
};

export default Login;







