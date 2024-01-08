import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HubIcon from '@mui/icons-material/Hub';
import WalletCard from './WalletCard';
const fontStyle = {
  mr: 2,
  display: { xs: 'flex', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'gray' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HubIcon sx={{ ...fontStyle, mr: 1 }} />
          <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" sx={fontStyle}>
            Ganache 註冊
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ flexGrow: 0 }}>


          
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
