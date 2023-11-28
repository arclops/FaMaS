import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.css';

import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ServiceCard from './servicecard'; // Create a ServiceCard component for individual service items

const servicesData = [
  {
    id: 1,
    icon: 'fas fa-clone',
    title: 'Responsive Design',
    description: 'Ensure that the Farmers Management System is accessible and user-friendly across various devices, providing a seamless experience for farmers and administrators alike.',
  },
  {
    id: 2,
    icon: 'fas fa-snowflake',
    title: 'Creative Design',
    description: 'Craft visually appealing and innovative designs for the Farmers Management System, enhancing its aesthetic appeal and user engagement.',
  },
  {
    id: 3,
    icon: 'fas fa-plug',
    title: 'SEO Optimized',
    description: 'Optimize the Farmers Management System for search engines, improving visibility and ensuring that relevant information is easily discoverable by users.',
  },
  {
    id: 4,
    icon: 'fas fa-desktop',
    title: 'Retina Ready',
    description: 'Deliver high-resolution graphics and visuals to ensure a crisp and clear display on devices with Retina screens, providing an enhanced viewing experience.',
  },
  {
    id: 5,
    icon: 'fas fa-trophy',
    title: 'Browser Compatibility',
    description: 'Guarantee that the Farmers Management System is compatible with various web browsers, ensuring consistent performance and functionality for all users.',
  },
  {
    id: 6,
    icon: 'fas fa-life-ring',
    title: 'Customer Support',
    description: 'Provide dedicated customer support for farmers and administrators using the Farmers Management System, offering assistance and resolving queries promptly.',
  },
];

function AppServices() {
  return (
    <Box id="services" className="block services-block" sx={{ paddingTop: '90px' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h2">Our Services</Typography>
          <Typography variant="subtitle1" color="textSecondary">Services We Provide for the Farmers Management System</Typography>
        </Box>
        <Grid container spacing={4}>
          {servicesData.map((service) => (
            <Grid item xs={12} sm={4} key={service.id}>
              <ServiceCard icon={service.icon} title={service.title} description={service.description} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AppServices;
