import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// ----------------------------------------------------------------------

const features = [
  {
    icon: <GroupsIcon />,
    title: 'Farmer records',
    description:
      'Admins get a searchable list of every farmer in the association, with farm size, number of farms and contact details. The list is sortable by name and one page of rows at a time, so finding a member does not mean reading the whole database.',
  },
  {
    icon: <PersonOffIcon />,
    title: 'Ban and unban',
    description:
      'An admin can block a farmer account and restore it later. Banned members are shown as banned in the list, and the farmer routes are checked before they are served.',
  },
  {
    icon: <Inventory2Icon />,
    title: 'Product listings',
    description:
      'Farmers publish what they are selling: product name, variants, price, stock, and an optional sale price. They can update a price or stock level, or take a listing down once the harvest is spoken for.',
  },
  {
    icon: <CloudUploadIcon />,
    title: 'Photo uploads',
    description:
      'Each listing can carry a photo. Uploads go to Cloudinary and the returned URL is stored with the product, so the association does not have to host image files itself.',
  },
  {
    icon: <StorefrontIcon />,
    title: 'Public marketplace',
    description:
      'The marketplace lists produce from every farmer, with filters and sorting. It is open to anyone — buyers do not need an account to look around.',
  },
  {
    icon: <LockPersonIcon />,
    title: 'Farmer and admin accounts',
    description:
      'Two roles share one login. Farmers manage their own profile and listings, admins manage the farmer database. Sessions are JWT-based and the client keeps the role to decide which area to show.',
  },
];

export default function AppFeatures() {
  return (
    <Box component="section" id="features" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.neutral' }}>
      <Container>
        <Stack spacing={1.5} sx={{ mb: 5, maxWidth: 720 }}>
          <Typography variant="h2" component="h2">
            What the app actually does
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Everything below is implemented in this repository. The two areas are
            separate on purpose: admins look after the association, farmers look
            after their own produce.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ mb: 2, color: 'success.main' }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
