import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Navbar = () => {
    return (
        <>
            {/* <AppBar>
                <Toolbar >
                    <Typography textAlign="center"><NavLink to={'/'} className={'link'}>HOME</NavLink></Typography>
                    <Typography textAlign="center"><NavLink to={'all'} className={'link'}>USERS's</NavLink></Typography>
                    <Typography textAlign="center"><NavLink to={'/'} className={'link'}>ADD USER</NavLink></Typography>
                </Toolbar>
            </AppBar> */}
            NavBar
            <Outlet />
        </>
    )
}

export default Navbar;



{/* <AppBar>
    <Toolbar >
        <Typography textAlign="center"><NavLink to={'/'} className={'link'}>HOME</NavLink></Typography>
        <Typography textAlign="center"><NavLink to={'all'} className={'link'}>USERS's</NavLink></Typography>
        <Typography textAlign="center"><NavLink to={'add'} className={'link'}>ADD USER</NavLink></Typography>
    </Toolbar>
</AppBar> */}