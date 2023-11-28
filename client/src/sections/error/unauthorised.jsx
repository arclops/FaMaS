/* eslint-disable import/no-unresolved */
// import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

function UnauthorizedView() {
  // const navigate = useNavigate();
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );

  const handleGoBack = () => {
    window.history.go(-2);
  };

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, color:'red' }}>
            Unauthorized Access!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, you don&apos;t have permission to access this page. If you believe this is an error,
            please contact the administrator.
          </Typography>

          <Box
            component="img"
            src="/assets/Unauthorised/unauth.webp"
            sx={{
              mx: 'auto',
              height: 360,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button onClick={handleGoBack} size="large" variant="contained" color="inherit" component={RouterLink}>
            Go back
          </Button>
        </Box>
      </Container>
    </>
  );
}

export { UnauthorizedView };
