/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import './fp.css';
import { Logerror } from '../login/error';
import { Resetsuccess } from "./resetsuccess";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
}));

export default function ForgotPass({ open, handleClose }) {
  const classes = useStyles();
  const [ emsel, setemsel ] = useState(false);
  const [ checksucc, setchecksucc ] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, seterr] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const [showconPassword, setShowconPassword] = useState(false);
  const [openRS, setopenRS] = useState(false);
  const [uid, setuid] = useState('');

  const checkuser = async (e) => {
    e.preventDefault();
    const data = emsel? document.getElementsByName("email")[0].value:document.getElementsByName("phone")[0].value;
    try{
      console.log("Initiating server contact")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forgot/userexists/${data}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });
    if( response.status === 200) {
      const userid = await response.json();
      setchecksucc(true);
      setIsSubmitting(false);
      return userid.uid;
    }
    if (response.status === 401 || response.status === 400 || response.status === 500 || response.status === 404) {
      seterr(true);
    }
    return response;
    } catch(error) {
      console.log(error.message);
      return error;
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const pass1 = document.getElementsByName("passwordnew")[0].value;
    const pass2 = document.getElementsByName("passwordconfirm")[0].value;
    if ( pass1 === pass2 )
    {
      try{
        console.log("Initiating server contact")
        const password = pass1;
        const body = {uid, password};
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forgot/reset`, {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body),
        });
        console.log(response);
        if( response.status === 200) {
          setopenRS(true);
          setIsSubmitting(false);setchecksucc(false);
        }
        if (response.status === 401 || response.status === 400 || response.status === 500 || response.status === 404) {
          seterr(true);
        }
        return response;
      } catch(error) {
        console.log(error.message);
      setopenRS(true);
    }
  }
  return null;    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button
    if(!checksucc){
    try{  
      const userid = await checkuser(e);
      console.log(userid);
      setuid(userid);
      // const { uid } = response.uid;
      // console.log(uid);
      return true;
    } catch(error){
      console.log(error.message);
      seterr(true);
      return error;
    }}
    else if(checksucc){
      handleReset(e);
    }

    setIsSubmitting(false); // Enable the button again after submission
    return true;
  };

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => {handleClose(); setchecksucc(false); setIsSubmitting(false);}}
      closeAfterTransition
    >
      
      <Fade in={open}>
        
        <Paper className={classes.paper} sx={{ width: 1 / 4 }}>
          <Grid item xs={5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" >Forgot Password</Typography>
              {/* <IconButton aria-label="" onClick={() => {setchecksucc(true);setIsSubmitting(false)}}>
              <CloseIcon />
              </IconButton> */}
              <IconButton aria-label="delete" onClick={()=>{handleClose();setchecksucc(false);setIsSubmitting(false)}}>
              <CloseIcon />
              </IconButton>
            </Stack>
            </Grid>
          <Grid container spacing={2}>
            <Grid>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Stack direction="row" spacing={1} sx={{ ml: 2, mt: 2 }}>
                <Button
                  fullWidth
                  component="div"
                  onClick={() => {
                    setemsel(false);
                  }}>
                  <Iconify icon="solar:phone-line-duotone" color="#1877F2" />
                </Button>
                <Typography variant="h3" display="flex" justifyContent="center" textAlign="center" >/</Typography>
                <Button
                  fullWidth
                  component="div"
                  onClick={() => {
                    setemsel(true);
                  }}>
                  <Iconify icon="logos:google-gmail" color="#1877F2" />
                </Button>
              </Stack>
            </Stack>
            </Grid>
            <Grid item xs={12}>
              { checksucc ? null: <TextField fullWidth label={emsel ? "Email" : "Phone Number"} name  = {emsel ? "email" : "phone"} type={emsel ? "email" : "phone"} sx={{ mb: 2 }}/> }
              { checksucc ? <TextField fullWidth label="New Password" name='passwordnew' type={shownewPassword ? 'text' : 'password'} sx={{ mb: 2 }} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShownewPassword(!shownewPassword)} edge="end">
                  <Iconify icon={shownewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }} /> : null}
              { checksucc ? <TextField fullWidth label="Confirm Password" name='passwordconfirm' type={showconPassword ? 'text' : 'password'} sx={{ mb: 2 }} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowconPassword(!showconPassword)} edge="end">
                  <Iconify icon={showconPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }} /> : null }
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                { checksucc ? "Change Password" : "Reset Password" }
              </Button>
            </Grid>
          </Grid>
          <Logerror openE={err} handleCloseE={() => {seterr(false);setIsSubmitting(false);}} />
          <Resetsuccess openRS={openRS} handleopenRS={() => {setopenRS(false);setIsSubmitting(false); }} handlecloseRS={handleClose} />
        </Paper>
      </Fade>
    </Modal>
    </Backdrop>
  );
}

ForgotPass.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
