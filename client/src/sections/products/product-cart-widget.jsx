import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center'
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
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
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 100
    });
  };

  return (
    <>
      {showTopBtn && (
        <StyledRoot>
          <Button
            onClick={goTop}
            sx={{
              cursor: 'pointer',
              borderRadius: '50%',
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '1px',
              width: '50px', // Set the width and height to make it perfectly round
              height: '50px',
              color: 'white',
            }}
            style={{ backgroundColor: 'black' }}
          >
            <ArrowUpwardIcon />
          </Button>
        </StyledRoot>
      )}
    </>
  );
}
