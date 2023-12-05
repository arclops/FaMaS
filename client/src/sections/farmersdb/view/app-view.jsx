import { faker } from '@faker-js/faker';
// import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppTasks from '../app-tasks';
// import getdetails from './accdetails';
import AppNewsUpdate from '../app-news-update';
import Iconify from '../../../components/iconify';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
// ----------------------------------------------------------------------
// Admin dashboard, try customizing this
export default function AppView() {
  // const [farmeracc, setFarmeracc] = useState({}); // State to store admin account details

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const farmerAccount = await getdetails(localStorage.getItem('uid'));
  //     setFarmeracc(farmerAccount);
  //   };

  //   fetchData(); // Fetch admin account details when component mounts
  // }, []);
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 5 }}>
        Dashboard
        {/* {farmeracc.fname.charAt(0).toUpperCase() + farmeracc.fname.slice(1) }  */}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Market Listings"
            total={25}
            color="brightgreen"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Crops Planted"
            total={20}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Crops Produced"
            total={19}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Crop Failure"
            total={1}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits 
            title="Weather Monitoring"
            subheader="Real-Time Weather Data for Informed Farming Decisions"
            chart={{
              labels: [
                
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
               
              ],
              series: [
                {
                  name: 'Humidity',
                  type: 'line',
                  fill: 'solid',
                  data: [18, 19, 13, 20, 30, 40, 67,58 , 48, 39, 28],
                },
                {
                  name: 'Sunlight/Daylight',
                  type: 'area',
                  fill: 'gradient',
                  data: [70, 71, 68, 57, 49, 53, 49, 51, 45, 39, 45],
                },
                {
                  name: 'Hailstorms',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 70, 79, 58, 48, 39, 32, 39],
                },
                {
                  name: 'Frost/Freeze',
                  type: 'line',
                  fill: 'solid',
                  data: [20, 20, 24, 24, 26, 30, 28, 20, 23, 40, 40],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Soil Health Monitoring"
            subheader="Crops Performance Based the Soil "
            chart={{
              categories: ['Soil Nutrient Levels', 'pH Levels', 'Soil Organic Matter', 'Soil Moisture', 'Soil Texture and Structure', 'Biological Activity'],
              series: [
                { name: 'Crops 1', data: [20, 120, 30, 20, 20, 120] },
                { name: 'Crops 2', data: [120,10, 20, 102, 20, 10] },
                { name: 'Crops 3', data: [90, 90, 90, 90, 90, 90] },
              ],
            }}
          />
        </Grid>
        
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Updates & Articles Regarding Crops"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>
       

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Profitability of Crops"
            subheader="Representing the revenue contribution of different crops to the farm's overall income:"
            chart={{
              series: [
                { label: 'Corn', value: 8000 },
                { label: 'Soybeans', value: 5435 },
                { label: 'Others', value: 1443 },
                { label: 'Wheat', value: 4443 },
              ],
            }}
          />
        </Grid>
       

      

       
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Crops Rates"
            subheader="per Kg (this month)"
            chart={{
              series: [
                { label: 'Abaca (Manila hemp)', value: 230 },
                { label: 'Rice', value: 15 },
                { label: 'Maize (corn)', value: 25 },
                { label: 'Pigeon pea', value: 329 },
                { label: 'Sorghum', value: 110 },
                { label: 'Pearl millet', value: 86 },
                { label: 'Moong beans', value: 180 },
                { label: 'Wheat', value: 26 },
                { label: 'Aonla/Indian gooseberry', value: 50 },
                { label: 'Sugarcane', value: 50 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Agricultural Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Preparation Phase:Months Before Planting Season',
                'Planting Season:Spring/Early Season',
                'Growing Season:Spring to Summer',
                'Harvesting Season :Late Summer to Fall',
                'Post-Harvest Season:Fall to Winter',
                'Year-Round Activities:Throughout the Year'
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>
        
        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Upcomming Farmer Tasks"
            list={[
              { id: '1', name: 'Planting, fertilizing and harvesting plants ' },
              { id: '2', name: 'Feeding and herding groups of animals.' },
              { id: '3', name: 'Providing special diets and care for animals.' },
              { id: '4', name: 'Performing manual labor.' },
              { id: '5', name: 'Operating farm equipment.' },
              { id: '6', name: 'Selecting and purchasing products such as fertilizer, seeds and equipment.' },
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Connect With Us"
            subheader="Feel free to connect with us in any of these"
            list={[
              {
                name: 'FaceBook',
                
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
