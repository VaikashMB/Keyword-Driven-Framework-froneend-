import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tabs1 from './Tabs1'
import ReportsComponent from './ReportsComponent';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import Profile from './Profile';
// import Footer from './Footer';

const PermanentDrawerComponent = () => {
    //width of the drawer
    const drawerWidth = 222;
    //state to store the selected item, initially selected item is 'Projects'
    const [selectedItem, setSelectedItem] = React.useState('Projects');

    //function to handle the selected item
    const handleSelectedItem = (text) => {
        setSelectedItem(text);
    }

    const location = useLocation();

    const { user, isAuthenticated, logout } = useAuth0();

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" noWrap component="div">
                            Keyword-Driven Framework
                        </Typography>
                        {isAuthenticated && user && location.pathname === '/home' && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
                                    Welcome {user.name}
                                </Typography>
                                <Button variant="outlined" size='small' sx={{ color: 'white', borderColor: 'white' }} onClick={logout}>Log Out</Button>
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            // maxHeight: '93%'
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        {/* ...list of 4 side bar items... */}
                        {['Projects', 'Monitor', 'Reports', 'Open API Specifications', 'Profile'].map((text) => (
                            <ListItem key={text}
                                disablePadding
                                onClick={() => handleSelectedItem(text)}
                                sx={{
                                    bgcolor: selectedItem === text ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                                }}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    {/* ...content of the side bar items... */}
                    {selectedItem === 'Projects' && <Tabs1 />}
                    {selectedItem === 'Reports' && <ReportsComponent />}
                    {selectedItem === 'Monitor' && "Monitor Component"}
                    {/* Open API Specifications */}
                    {selectedItem === 'Open API Specifications' && (
                        <iframe
                            src="http://localhost:8081/swagger-ui/index.html"
                            title="Swagger UI"
                            style={{ width: '100%', height: '340%' }}
                        />)}
                    {selectedItem === 'Profile' && <Profile />}
                </Box>
            </Box>
            {/* <Box>
                <Footer />
            </Box> */}
        </Box>
    );
}

export default PermanentDrawerComponent