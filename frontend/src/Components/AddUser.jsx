import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from '@mui/material';
import { addUser } from '../service/Services';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const initialValue = {
    name: "",
    username: "",
    email: "",
    phone: "",
}

const AddUser = () => {

    const [user, setUser] = useState(initialValue);

    const nav = useNavigate();

    const forChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const forSubmit = async () => {
        await addUser(user);
        nav('/all');
    }

    return (
        <Container maxWidth="sm">
            <Box my={5}>
                <Typography variant="h5" align="center">Add User Details</Typography>
                <FormGroup className='FormGroup'>
                    <FormControl>
                        {/* <InputLabel>Name</InputLabel> */}
                        <TextField onChange={(e) => forChange(e)} name="name" className='my-2' label="Name" color="secondary" />
                        {/* <Input onChange={(e) => forChange(e)} name="name" value={user.name} className='FormControl' /> */}
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel>User Name</InputLabel> */}
                        <TextField onChange={(e) => forChange(e)} name="username" label='User Name' className='my-2' color="secondary" />
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel>Email address</InputLabel> */}
                        <TextField onChange={(e) => forChange(e)} name="email" label='Email address' className='my-2' color="secondary" />
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel>Phone Number</InputLabel> */}
                        <TextField onChange={(e) => forChange(e)} name="phone" label='Mobile Number' className='my-2' color="secondary" />
                    </FormControl>
                    <Box my={3}>
                        <Button variant="contained" onClick={() => {forSubmit(),nav('/all')}} color="primary" align="center">Add User</Button>
                        <Button onClick={() => nav('/all')} variant="contained" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    )
}


export default AddUser;