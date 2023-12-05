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
    description: "From smartphones to desktops, FaMaS boasts a responsive design that adapts flawlessly. It's built to ensure a smooth and intuitive experience, regardless of the device you're using.",},
  {
    id: 2,
    icon: 'fas fa-snowflake',
    title: 'Creative Design',
    description: "Modeled with the trendiest designs in mind, our platform appeals to the eyes of all users. With its intuitive design, FaMaS ensures a cohesive and engaging user experience. "},
  {
    id: 3,
    icon: 'fas fa-cogs',
    title: 'Fully Optimized',
    description: "FaMaS is meticulously optimized for Search Engines. With enhanced visbility, our platform ensures easy accessibility, making vital information readily discoverable to all users alike"},
  {
    id: 4,
    icon: 'fas fa-bell',
    title: 'Task Scheduling and Alerts',
    description: "Functionality for setting up tasks, reminders, and alerts related to planting, watering, harvesting, and other essential farm activities."},
  {
    id: 5,
    icon: 'fas fa-cloud-showers-heavy',
    title: 'Weather and Soil Analysis',
    description: " FaMas Access to weather forecast, This information can aid farmers in making informed decisions about planting, irrigation, and crop care."},
  {
    id: 6,
    icon: 'fas fa-headset',
    title: 'Customer Support',
    description: 'We provide 24/7 customer support to ensure a smooth and efficient user experience. Our team of experts is ready to assist you with any queries or concerns you may have.',
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
