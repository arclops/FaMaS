import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { submitContactForm } from '../api';

// ----------------------------------------------------------------------

const contactDetails = [
  { label: 'Location', value: 'NMAM Institute of Technology, Nitte, Karnataka' },
  { label: 'Project', value: 'github.com — see the repository README for links' },
];

const emptyForm = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  message: '',
};

export default function AppContact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setError('');

    try {
      await submitContactForm(form);
      setForm(emptyForm);
      setSent(true);
    } catch (submissionError) {
      setError(
        submissionError?.message || 'The message could not be sent. Please try again in a moment.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h2" component="h2" sx={{ mb: 1.5 }}>
              Tell us about your association
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Questions about running FaMaS for a group of farmers, or about
              hosting it yourself? Send a note and we will get back to you.
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ maxWidth: 640 }}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    id="contact-first-name"
                    name="fname"
                    label="First name"
                    autoComplete="given-name"
                    value={form.fname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    id="contact-last-name"
                    name="lname"
                    label="Last name"
                    autoComplete="family-name"
                    value={form.lname}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    id="contact-email"
                    name="email"
                    label="Email address"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    label="Phone number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    id="contact-message"
                    name="message"
                    label="Message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </Grid>

                {error && (
                  <Grid item xs={12}>
                    <Box role="alert" sx={{ color: 'error.main', typography: 'body2' }}>
                      {error}
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <Button type="submit" size="large" variant="contained" disabled={sending}>
                      {sending ? 'Sending…' : 'Send message'}
                    </Button>
                    <Typography variant="caption" color="text.secondary">
                      Messages are stored in the project&apos;s own PostgreSQL database.
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Typography variant="h3" component="h3">
                Where this comes from
              </Typography>
              <Typography variant="body2" color="text.secondary">
                FaMaS started as a hackathon build for farmer associations and is
                still a student project, so the demo deployments are shared and
                occasionally restarted.
              </Typography>

              <Divider />

              {contactDetails.map((detail) => (
                <Stack key={detail.label} spacing={0.5}>
                  <Typography variant="subtitle2">{detail.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {detail.value}
                  </Typography>
                </Stack>
              ))}

              <Divider />

              <Stack spacing={0.5}>
                <Typography variant="subtitle2">Routes worth opening</Typography>
                <Link href="#try-it" underline="hover" variant="body2">
                  Try the demo
                </Link>
                <Link href="#features" underline="hover" variant="body2">
                  What the app does
                </Link>
                <Link href="#overview" underline="hover" variant="body2">
                  Back to the top of the page
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={sent} onClose={() => setSent(false)} aria-labelledby="contact-success-title">
        <DialogTitle id="contact-success-title">Message sent</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Thanks for writing in. We will get back to you at the email address
            you provided.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSent(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
