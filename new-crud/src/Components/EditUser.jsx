import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@mui/material';
import { editUser, getallUsers } from '../service/Services';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material';


const EditUser = () => {

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
        name: "",
        username: "",
        email: "",
        phone: "",
    });
    const { name, username, email, phone } = user;

    const { id } = useParams();
    const nav = useNavigate();



    const forGet = async () => {
        const response = await getallUsers(id);
        setUser(response.data);
    }

    useEffect(() => {
        forGet();
    }, []);


    const forChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const forEdit = async () => {
        await editUser(id, user);
        nav('/all')
    }

    return (
        <Container maxWidth="sm" className='edit'>
            <Box my={5}>
                <Typography variant="h5" align="center">Update User Details</Typography>
                <FormGroup>
                    <FormControl>
                        {/* <InputLabel>Name</InputLabel> */}
                        <TextField onChange={forChange} name="name" value={name} label="Name"  color="secondary" className='my-2' />
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel>User Name</InputLabel> */}
                        <TextField onChange={forChange} name="username" value={username} label='Username' className='my-2' />
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel>Email address</InputLabel> */}
                        <TextField onChange={forChange} name="email" value={email} label='Email Adress' className='my-2' />
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel>Phone Number</InputLabel> */}
                        <TextField onChange={forChange} name="phone" value={phone} label='Mobile Number' className='my-2' />
                    </FormControl>
                    <Box my={3}>
                        <Button variant="contained" onClick={forEdit} color="primary" align="center">Update User</Button>
                        <ThemeProvider theme={theme}>
                        <Button onClick={() => nav('/all')} variant="contained" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </ThemeProvider>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    )
}


export default EditUser;