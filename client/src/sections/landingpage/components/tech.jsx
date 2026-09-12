import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const stack = [
  {
    name: 'PostgreSQL',
    image: '/assets/images/stack/psql.png',
    alt: 'PostgreSQL elephant logo',
    note: 'Farmer records, products and contact messages.',
  },
  {
    name: 'Express',
    image: '/assets/images/stack/express.png',
    alt: 'Express.js logo',
    note: 'REST API for auth, farmers, products and the marketplace.',
  },
  {
    name: 'React',
    image: '/assets/images/stack/react.png',
    alt: 'React logo',
    note: 'The dashboard, the admin area and this page.',
  },
  {
    name: 'Node.js',
    image: null,
    alt: '',
    note: 'Server runtime and the package scripts.',
  },
];

export default function AppTech() {
  return (
    <Box component="section" id="tech" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.neutral' }}>
      <Container>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="h2" component="h2">
                How it is built
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The project is a PERN stack: PostgreSQL, Express, React and Node.
                The API and the client live in the same repository and both run
                from Docker.
              </Typography>

              <Grid container spacing={3}>
                {stack.map((item) => (
                  <Grid item xs={6} sm={3} md={6} key={item.name}>
                    <Stack spacing={1}>
                      {item.image ? (
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.alt}
                          sx={{ width: 48, height: 48, objectFit: 'contain' }}
                        />
                      ) : (
                        <Box
                          aria-hidden="true"
                          sx={{
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                            typography: 'subtitle2',
                            color: 'success.contrastText',
                            bgcolor: 'success.main',
                          }}
                        >
                          JS
                        </Box>
                      )}
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.note}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/covers/cover_16.jpg"
              alt="A field of wheat lit by the sun at sunset"
              sx={{
                width: '100%',
                height: { xs: 220, md: 360 },
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
