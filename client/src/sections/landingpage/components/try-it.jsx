import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const trials = [
  {
    title: '1. Look at the marketplace first',
    body: (
      <>
        <Link component={RouterLink} to="/marketplace">
          /marketplace
        </Link>{' '}
        is public, so no account is needed. Each product shows its price and the
        stock on hand, and the grid can be filtered and sorted.
      </>
    ),
  },
  {
    title: '2. Sign in as a farmer',
    body: (
      <>
        Accounts are created at{' '}
        <Link component={RouterLink} to="/register">
          /register
        </Link>{' '}
        and used at{' '}
        <Link component={RouterLink} to="/login">
          /login
        </Link>
        . A farmer lands on{' '}
        <Link component={RouterLink} to="/dashboard">
          /dashboard
        </Link>
        , where a product can be added with a name, variants, price, stock and a
        photo.
      </>
    ),
  },
  {
    title: '3. Sign in as an admin',
    body: (
      <>
        An admin account opens{' '}
        <Link component={RouterLink} to="/admin">
          /admin
        </Link>
        . That area lists the farmers in the association and lets you open a
        single record to see how many farms the member runs and how much land
        they hold, or ban and unban the account.
      </>
    ),
  },
];

export default function AppTryIt() {
  return (
    <Box component="section" id="try-it" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Stack spacing={1.5} sx={{ mb: 5, maxWidth: 720 }}>
          <Typography variant="h2" component="h2">
            Try it
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Two demo accounts are enough to see both sides of the app in a couple
            of minutes. Sign in at{' '}
            <Link component={RouterLink} to="/login">
              /login
            </Link>
            .
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {trials.map((trial) => (
            <Grid item xs={12} md={4} key={trial.title}>
              <Stack spacing={1.5}>
                <Typography variant="h5" component="h3">
                  {trial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trial.body}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Alert severity="info" sx={{ mt: 5 }}>
          The demo logins are listed in the project README so they stay in one
          place and can be changed without touching this page.
        </Alert>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button component={RouterLink} to="/marketplace" variant="contained">
            Open the marketplace
          </Button>
          <Button component={RouterLink} to="/login" variant="outlined">
            Go to the login page
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
