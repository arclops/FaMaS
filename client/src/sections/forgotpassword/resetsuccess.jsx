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

  function Resetsuccess({ openRS, handleopenRS, handlecloseRS}) {
    const classes = useStyles();
    
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openRS}
      >
        <Modal
          className={classes.modal}
          open={openRS}
          onClose={()=>{handleopenRS(); handlecloseRS();}}
          closeAfterTransition
        >
          <Fade in={openRS}>
            <Paper className={classes.paper}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2}>
                  <Iconify icon="icon-park:success" sx={{ height: '1.75rem', width: '1.75rem' }} />
                  <Typography variant="h5">Password Reset Successful!</Typography>
                </Stack>
                <IconButton aria-label="close" onClick={handleopenRS} sx={{ ml: 1.5 }}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Paper>
          </Fade>
        </Modal>
      </Backdrop>
    );
  }

Resetsuccess.propTypes = {
    openRS: PropTypes.bool.isRequired,
    handleopenRS: PropTypes.func.isRequired,
    handlecloseRS: PropTypes.func.isRequired
  };

export { Resetsuccess };