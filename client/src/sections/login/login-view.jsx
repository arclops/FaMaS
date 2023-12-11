/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { Logerror } from './error';
import { Logsuccess } from './success';
import Logo from '../../components/logo';
import { AccountBanned } from './banned';
import { bgGradient } from '../../theme/css';
import { useRouter } from '../../routes/hooks';
import Iconify from '../../components/iconify';
import { ForgotPass } from '../forgotpassword';
import { Futuresupport } from './futuresupport';
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [ emsel, setemsel ] = useState(false);
  const [ succ, setsucc ] = useState(false);
  const [ err, seterr ] = useState(false);
  const [ openFS, setopenFS ] = useState(false);
  const [ role, setrole ] = useState('farmer');
  const [ openBan, setopenBan ] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    const email = emsel? document.getElementsByName("email")[0].value:null;
    const password = document.getElementsByName("password")[0].value;
    const phone = emsel? null:document.getElementsByName("phone")[0].value;
    const body = { email,password,phone };
    try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if( response.status === 200) {
      const resp = await response.json();
      if ('message' in resp){
        setopenBan(true);
        return;
      }
      localStorage.setItem("uid", resp.uid);
      localStorage.setItem("role", resp.role);
      if (resp.role === "admin") setrole("admin");
      if (resp.role === "farmer") setrole("farmer");
      setsucc(true);
    } else if (response.status === 401 || response.status === 400 || response.status === 500) {
      seterr(true);
    }} catch(error) {
      console.log(error.message);
      seterr(true);
    }
  };

  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };

  const renderForm = (
    <>
      <Paper sx={{ p: 1.25 }}>
      <form>
      <Stack spacing={3} sx={{ mt: 2 }}>
        {emsel? <TextField required name="email" label="Email Address" type ="email" helperText="Well, this is required" /> : null}
        {emsel? null : <TextField required name="phone" label="Phone Number" type = "phone" helperText="Well, this is required" />}
        <TextField required helperText="Quick peek now ;)"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete='current-password'
        />
      </Stack>
      </form>
      </Paper>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover" onClick={handleOpen} style={{ cursor: 'pointer' }}>
          Forgot password?
        </Link>
        <ForgotPass open={open} handleClose={handleClose} />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, width: 1, p: 3 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 450,
            height: 650,
            overflow: 'scroll',
            overflowX: 'hidden',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
          }}
        >
          <Typography variant="h4">Sign in to your Account</Typography>
          <Stack direction="row" spacing={0.1}>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?</Typography>
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={() => {router.push('/register');}} style={{cursor: 'pointer'}}>
              Get started</Link>
            {/* <Button onClick={() => setsucc(true)}>Success</Button> */}
            <Logsuccess openS={succ} handleCloseS={() => {setsucc(false);if(role==="admin") router.push('/admin');else router.push('/dashboard');}} />
            {/* <Button onClick={() => seterr(true)}>Error</Button> */}
            <Logerror openE={err} handleCloseE={() => seterr(false)} />
            <Futuresupport openFS={openFS} handlecloseFS={() => setopenFS(false)} />
            <AccountBanned openAB={openBan} handlecloseAB={() => setopenBan(false)} />
          </Stack>
          

          <Stack direction="row" spacing={2} sx={{pt:3}}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="contained"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={() => setopenFS(true)}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="contained"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={() => {setopenFS(true);}}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="contained"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={() => {setopenFS(true);}}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined "
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={() => {
                setemsel(false);
              }}>
              <Iconify icon="solar:phone-line-duotone" color="#1877F2" />
            </Button>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={() => {
                setemsel(true);
              }}>
              <Iconify icon="logos:google-gmail" color="#1877F2"/>
            </Button>
          </Stack>
            
              
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
