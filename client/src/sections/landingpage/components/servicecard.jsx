/* eslint-disable react/prop-types */
import React from 'react';
import { any } from 'prop-types';

import { Card, Typography, CardContent } from '@mui/material';

function ServiceCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent>
        <div className="icon">
          <i className={icon} />
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
