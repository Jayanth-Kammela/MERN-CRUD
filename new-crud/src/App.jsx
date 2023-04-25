import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AllUsers from './Components/AllUsers';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import NotFound from './Components/NotFound';
import NewForm from './Components/NewForm';
import Login from './Components/Login';
import Register from './Components/Register';
import TextField from '@mui/material/TextField';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import ProtectedRoute from './tokens/ProtectedRoute';

function App() {
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

  return (
    <>
      {/* <Login/> */}
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

      {/* <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllUsers />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes > */}


      {/* <Routes>
        <Route path='/' element={<Login />} />
      </Routes> */}


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Navbar />}>
            <Route path="/all" element={<AllUsers />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;


// {/* <NewMat/> */ }
// {/* <NewForm /> */ }

