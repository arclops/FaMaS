/* eslint-disable react/prop-types */
import React from 'react';
import { any } from 'prop-types';

import { styled } from '@mui/system';
import { Card, Typography, CardContent } from '@mui/material';

const ServiceIcon = styled('i')({
  color: 'inherit', // Initial color
  transition: 'color 0.3s ease-in-out', // Transition for color change on hover
  '&:hover': {
    color: 'linear-gradient(to right, #333333, #dd1818)', // New color on hover
  },
});
function ServiceCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent>
        <div className="icon">
        <ServiceIcon className={icon} />
        </div>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

ServiceCard.PropsType = {
  icon: any,
  title: any,
  description: any,
}

export default ServiceCard;
