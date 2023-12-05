// eslint-disable-next-line import/no-extraneous-dependencies
import { React } from 'react';
import { Link } from 'react-scroll';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { Typography } from '@mui/material';

import { useRouter } from '../../../routes/hooks';

function AppHeader() {
  const router = useRouter();
  const navLinkStyle = {
    padding: '0.5rem 1rem',
    margin: '0 0.5rem',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none !important',
    },
  };

  return (
    <Navbar bg="light" expand="lg" variant="light">
      <Container>
        <Navbar.Brand href='#'>
          <img src='assets/Logo.png' alt="logo" style={{ width: '75px', height: '50px', marginRight: '10px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Typography variant="h6" sx={navLinkStyle}>
              <Link to="home" smooth duration={10} offset={-75} style={{ cursor: 'pointer' }}>Home</Link>
            </Typography>
            <Typography variant="h6" sx={navLinkStyle} >
              <Link to="marketplace" style={{ cursor: 'pointer' }} onClick={() => router.push('/marketplace')}>Market</Link>
            </Typography>
            <Typography variant="h6" sx={navLinkStyle}>
            <Link to="about" smooth duration={10} offset={-75} style={{ cursor: 'pointer' }}>About</Link>
            </Typography>
            <Typography variant="h6" sx={navLinkStyle}>
            <Link to="services" smooth duration={10} offset={-75} style={{ cursor: 'pointer' }}>Services</Link>
            </Typography>
            <Typography variant="h6" sx={navLinkStyle}>
            <Link to="testimonials" smooth duration={10} offset={-75} style={{ cursor: 'pointer' }}>Testimonials</Link>
            </Typography>
            <Typography variant="h6" sx={navLinkStyle}>
            <Link to="contact" smooth duration={10} offset={-75} style={{ cursor: 'pointer' }}>Contact</Link>
            </Typography>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
