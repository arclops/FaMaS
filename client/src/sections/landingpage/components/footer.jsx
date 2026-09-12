import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', py: 5 }}>
      <Container>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6" component="h2" sx={{ color: 'common.white' }}>
                FaMaS
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 420, color: 'grey.400' }}>
                A farmers management system for associations: member records,
                product listings and a public marketplace.
              </Typography>
            </Box>

            <Stack component="nav" aria-label="Footer" spacing={1}>
              <Link
                component={RouterLink}
                to="/marketplace"
                underline="hover"
                sx={{ color: 'grey.400' }}
              >
                Marketplace
              </Link>
              <Link component={RouterLink} to="/login" underline="hover" sx={{ color: 'grey.400' }}>
                Log in
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                underline="hover"
                sx={{ color: 'grey.400' }}
              >
                Register
              </Link>
            </Stack>
          </Stack>

          <Typography variant="caption" sx={{ color: 'grey.500' }}>
            Built with PostgreSQL, Express, React and Node. Student project, so the
            demo data is not production data.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
