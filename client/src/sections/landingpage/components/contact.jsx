import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { List, ListItem, Typography, ListItemIcon, ListItemText } from '@mui/material';

function AppContact() {
  return (
    <section id="contact" className="block contact-block">
      <Container fluid>
        <div className="title-holder">
          <Typography variant="h3">Contact us</Typography>
          <Typography variant="subtitle2">Get connected with us</Typography>
        </div>
        <Row>
          <Col sm={6}>
            <Form className='contact-form'>
              <Row>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="First Name" required />
                </Col>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Last Name" required />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Control type="email" placeholder="Email address" required />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Control type="tel" placeholder="Contact Number" required />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Control as="textarea" placeholder="Leave a message for us" required />
                </Col>
              </Row>
              <Row>
                <Col sm={12} className='btn-holder'>
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={6} className='google-map'>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3884.667837887532!2d74.93091777593315!3d13.183330987151848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDEwJzYwLjAiTiA3NMKwNTYnMDAuNiJF!5e0!3m2!1sen!2sus!4v1699952342057!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: '1px solid #ddd', borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} className='contact-info'>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">karthik@gmail.com</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">9876543210</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">Nmamit, Nitte</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppContact;
