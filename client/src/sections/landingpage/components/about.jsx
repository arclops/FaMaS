import React from 'react';

import Avatar from '@mui/material/Avatar';
import { Stack, styled } from '@mui/system';
import { Grid, Container, Typography, LinearProgress } from '@mui/material';

import img1 from '../assets/images/img1.jpg';

const StyledLinearProgress = styled(LinearProgress)({
  width: '100%',
  height: '15px',
  borderRadius: '8px',
});

function AppAbout() {
  const project = 60;

  const pernIcons = [
    'assets/images/stack/psql.png',
    'assets/images/stack/express.png',
    'assets/images/stack/react.png',
    'assets/images/stack/node.png'
  ];
  const getTName = (index) => {
    const Names = [
      'PostGRESQL',
      'Express.js',
      'React.js',
      'Node.js'
    ];
    return Names[index];
  }

  const getTechnologyName = (index) => {
    const technologies = ['PSQL', 'Express.js', 'React.js', 'Node.js'];
    return technologies[index];
  };

  return (
    <section id="about" className="block about-block" style={{ paddingTop: '90px' }}>
      <Container>
        <div className="title-holder">
          <Typography variant="h3">About Us</Typography>
          <Typography variant="subtitle1">Learn more about us</Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img src={img1} alt="About Us" style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" >About the Project</Typography>
            <Typography variant="body1"
            sx={{ mb: 2 }}>
              The Farmer Management System is a comprehensive software solution aimed at assisting farmers in managing their agricultural activities, resources, and data effectively. It provides a digital platform to streamline farming processes and some farm-related information to increase productivity and profitability.
            </Typography>
            <div className='progress-block' style={{ marginBottom: 50 }}>
              <Typography variant="h4">Status</Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <StyledLinearProgress variant="determinate" value={project} />
              <Typography variant="h5">{project}%</Typography>
              </Stack>
            </div>
            <Typography variant="h6">Meet the Team</Typography> 
            <Typography variant="body1" sx={{ mb: 2 }}>
              We are Nachiketha and Karthik, passionate computer science students who came together to create an innovative and user-friendly solution for our college DBMS project. With a shared love for technology and a strong drive for excellence, we embarked on this journey to develop a cutting-edge system using the power of React.js, Node.js, PostgreSQL, and Express.
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>Tools/Frameworks</Typography>
            <Grid container spacing={2} alignItems="center">
      {pernIcons.map((icon, index) => (
        <Grid item key={index}>
          <Avatar alt={`Logo ${index + 1}`} src={icon} sx={{ width: 100, height: 100, padding: 1.4 }} title={getTName(index)} />
          <Typography variant="body2" align="center">
            {getTechnologyName(index)}
          </Typography>
        </Grid>
      ))}
    </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default AppAbout;
