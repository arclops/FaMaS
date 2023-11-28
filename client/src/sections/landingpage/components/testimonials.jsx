import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

import { Typography } from '@mui/material';

const testimonialsData = [
  {
    id: 1,
    name: 'Nachiketha',
    description: 'Node.js, Express.js, PostgreSQL, REST APIs.',
    designation: 'Back-End Developer & Front-End Developer'
  },
  {
    id: 2,
    name: 'Karthik',
    description: 'React.js,  HTML, CSS, JavaScript',
    designation: 'Front-End Developer'
  },
]

function AppTestimonials() {
  return (
    <section id="testimonials" className="testimonials-block">
      <Container fluid>
        <div className="title-holder">
          <Typography variant="h3">Testimonials</Typography>
          <div className="subtitle" />
        </div>
        <Carousel controls>
          {
            testimonialsData.map(testimonials => (
                <Carousel.Item key={testimonials.id}>
                  <blockquote>
                    <Typography variant="h5">{testimonials.description}</Typography>
                    <cite>
                      <Typography variant="h6">{testimonials.name}</Typography>
                      <Typography variant="subtitle2">{testimonials.designation}</Typography>
                    </cite>
                  </blockquote>             
                </Carousel.Item>
              ))
          }
        </Carousel>
      </Container>
    </section>
  );
}

export default AppTestimonials;