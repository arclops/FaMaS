/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Iconify from '../../components/iconify';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: { // Use an error background color
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      position: 'relative', // Add this line to make animations work
    },
    errorText: {
      fontSize: '1.5rem',
      color: 'red',
      animation: '$shake 0.8s ease infinite', // Add an animation for error effect
    },
    '@keyframes shake': {
      '0%': {
        transform: 'translateX(0) translateY(0)',
      },
      '25%': {
        transform: 'translateX(-2px) translateY(-2px)',
      },
      '50%': {
        transform: 'translateX(2px) translateY(2px)',
      },
      '75%': {
        transform: 'translateX(-2px) translateY(-2px)',
      },
      '100%': {
        transform: 'translateX(2px) translateY(2px)',
      },
    },
  }));

  function Regexistserror({ openREE, handleCloseREE }) {
    const classes = useStyles();
    
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openREE}
      >
        <Modal
          className={classes.modal}
          open={openREE}
          onClose={handleCloseREE}
          closeAfterTransition
        >
          <Fade in={openREE}>
            <Paper className={classes.paper}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2}>
                  <Iconify icon="iconoir:db-error" sx={{ height: '1.75rem', width: '1.75rem' }} />
                  <Typography variant="h5" className={classes.errorText}>Account with that email/phone already exists!</Typography>
                </Stack>
                <IconButton aria-label="close" onClick={handleCloseREE} sx={{ ml: 1.5 }}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Paper>
          </Fade>
        </Modal>
      </Backdrop>
    );
  }

Regexistserror.propTypes = {
    openREE: PropTypes.bool.isRequired,
    handleCloseREE: PropTypes.func.isRequired,
  };

export { Regexistserror };