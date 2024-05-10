import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Login = () => {
    const navigate = useNavigate()
    const { user, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [loading, setLoading] = useState(isLoading);

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    return (
        // <Box>
        //     <AppBar position="fixed" color="primary">
        //         <Toolbar>
        //             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        //                 My App
        //             </Typography>
        //             <Button color="inherit">Login</Button>
        //         </Toolbar>
        //     </AppBar>
        //     <Box display='flex' flexDirection='column' gap='20px' marginTop='300px'>
        //         {loading ? (
        //             <Box display="flex" justifyContent="center">
        //                 <CircularProgress />
        //             </Box>
        //         ) : (
        //             <Box display='flex' flexDirection='column' gap='20px' marginTop='300px'>
        //                 {isAuthenticated && (
        //                     <Typography display="flex" justifyContent="center" variant='h4'>Welcome {user.name}</Typography>
        //                 )}
        //                 {!isAuthenticated && (
        //                     <Grid container display="flex" justifyContent="center" alignItems="center">
        //                         <Grid item>
        //                             <Button variant='outlined' onClick={(e) => loginWithRedirect()}>Log-In</Button>
        //                         </Grid>
        //                     </Grid>
        //                 )}
        //             </Box>
        //         )}
        //     </Box>
        //     <Footer />
        // </Box>

        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        KEYWORD DRIVEN FRAMEWORK
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {isAuthenticated && (
                            <Typography variant='h4' textAlign='center' mb={4}>Welcome {user.name}</Typography>
                        )}
                        {!isAuthenticated && (
                            <Typography variant='h4' textAlign='center' mb={4}>Please log in to continue</Typography>
                        )}
                        <Button variant='contained' onClick={loginWithRedirect}>Log In</Button>
                    </>
                )}
            </Box>
            <Footer />
        </Box>

    )
}

export default Login
