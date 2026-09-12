import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export default function AppHero() {
  return (
    <Box component="section" id="overview" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3} alignItems="flex-start">
              <Box
                component="p"
                sx={{
                  m: 0,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  typography: 'subtitle2',
                  color: 'success.dark',
                  bgcolor: 'success.lighter',
                }}
              >
                Built at a hackathon for farmer associations
              </Box>

              <Box component="h1" sx={{ m: 0, typography: { xs: 'h3', md: 'h2' } }}>
                Farmer records and farm produce, in one place.
              </Box>

              <Box component="p" sx={{ m: 0, typography: 'body1', color: 'text.secondary' }}>
                FaMaS is a web app for farmer associations. Admins keep the member
                database tidy, farmers publish what they are harvesting, and the
                public marketplace is where the produce gets found.
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                <Button component={RouterLink} to="/marketplace" size="large" variant="contained">
                  Browse the marketplace
                </Button>
                <Button component={RouterLink} to="/login" size="large" variant="outlined">
                  Log in to your account
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/covers/cover_3.jpg"
              alt="A farmer crouching in a field of tall green crops"
              sx={{
                width: '100%',
                height: { xs: 260, md: 400 },
                objectFit: 'cover',
                borderRadius: 2,
                display: 'block',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
