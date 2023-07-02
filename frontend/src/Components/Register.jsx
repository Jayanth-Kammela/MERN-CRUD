import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, ThemeProvider, createTheme, Container, Grid } from '@mui/material';
import { toast } from 'react-toastify';

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

  const forChange = (event) => {
    // const { name, value } = event.target;
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const forRegister = () => {
    const { useremail, password } = user;

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
    <React.Fragment>
      <Container maxWidth="xs" className="edit shadow-lg">
        <Box mx={0} px={2} py={6}>
          <h4 className="text-center">Sign up</h4>
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
                  <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={forRegister}
                    style={{
                      color: 'white',
                      height: "2.6em",
                    }} >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid> */}
                    <Grid item>
                      Already have an account?<Link to="/" variant="body2">
                        {"Log in"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Register;
