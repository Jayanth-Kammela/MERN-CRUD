import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, Button } from '@mui/material';
import { deleteUser, getallUsers } from '../service/Services';
import { Link } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});


const AllUsers = () => {


    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true)


    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await getallUsers();
            // console.log(response);
            setUser(response.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const deleteData = async (id) => {
        await deleteUser(id);
        getUsers();
    }

    return (
        <>
           {loading ? <div className="spinner"></div>: <Table className='table'>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>UserName</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        user.map((data) => (
                            <TableRow key={data._id}>
                                <TableCell>{data._id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>
                                    <Button className='btn btn-primary text-decoration-none mx-2' variant="contained" color="primary" component={Link} to={`/edit/${data._id}`}>Edit</Button>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" color="secondary" onClick={() => deleteData(data._id)}>Delete</Button>
                                    </ThemeProvider>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>}
        </>
    )
}

export default AllUsers;
