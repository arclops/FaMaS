/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from "react";

import Stack from '@mui/material/Stack';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function AppFooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Pass an empty dependency array to run this effect only once

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 100
    });
  };

  return (
    <Container fluid >
      <Typography variant="body2" className="copyright">&copy; 2023 FAMAS. All Right Reserved.</Typography>
      <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: '10px' }}>
        <IconButton color="black" href="https://www.facebook.com"><FacebookIcon /></IconButton>
        <IconButton color="black" href="https://www.twitter.com"><TwitterIcon /></IconButton>
        <IconButton color="black" href="https://www.linkedin.com"><LinkedInIcon /></IconButton>
      </Stack>
      {
        showTopBtn && (
          <div className="go-top" onClick={goTop} style={{ cursor: 'pointer', backgroundColor: 'black', borderRadius: '50%', position: 'fixed', bottom: '20px', right: '20px', padding: '10px' }}>
            <IconButton color="primary">
              <ArrowUpwardIcon />
            </IconButton>
          </div>
        )
      }
    </Container>
  );
}

export default AppFooter;
