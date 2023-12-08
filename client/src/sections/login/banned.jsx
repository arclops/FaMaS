/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
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

import Iconify from 'src/components/iconify';

import './lp.css';

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

  function AccountBanned({ openAB, handlecloseAB }) {
    const classes = useStyles();
    
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAB}
      >
        <Modal
          className={classes.modal}
          open={openAB}
          onClose={handlecloseAB}
          closeAfterTransition
        >
          <Fade in={openAB}>
            <Paper className={classes.paper}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2}>
                    <Iconify icon="ion:ban-outline" sx={{ height: '1.75rem', width: '1.75rem', color: 'red' }} />
                    <Stack direction="column" spacing={2}>
                      <Typography variant="h5">Your Account has been banned!</Typography>
                      <Typography variant="body2">Contact Administrator for more information</Typography>
                    </Stack>
                  </Stack>
                <IconButton aria-label="close" onClick={handlecloseAB} sx={{ ml: 1.5 }}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Paper>
          </Fade>
        </Modal>
      </Backdrop>
    );
  }

AccountBanned.propTypes = {
    openAB: PropTypes.bool.isRequired,
    handlecloseAB: PropTypes.func.isRequired,
  };

export { AccountBanned };