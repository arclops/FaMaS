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

  function Logerror({ openE, handleCloseE }) {
    const classes = useStyles();
    
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openE}
      >
        <Modal
          className={classes.modal}
          open={openE}
          onClose={handleCloseE}
          closeAfterTransition
        >
          <Fade in={openE}>
            <Paper className={classes.paper}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2}>
                  <Iconify icon="iconoir:db-error" sx={{ height: '1.75rem', width: '1.75rem' }} />
                  <Typography variant="h5">User doesn&apos;t exist!</Typography>
                </Stack>
                <IconButton aria-label="close" onClick={handleCloseE} sx={{ ml: 1.5 }}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Paper>
          </Fade>
        </Modal>
      </Backdrop>
    );
  }

Logerror.propTypes = {
    openE: PropTypes.bool.isRequired,
    handleCloseE: PropTypes.func.isRequired,
  };

export { Logerror };