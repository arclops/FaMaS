/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti'; // Import the react-confetti library
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Iconify from '@/components/iconify';

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

function Logsuccess({ openS, handleCloseS }) {
  const classes = useStyles();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openS}
    >
      <Modal
        className={classes.modal}
        open={openS}
        onClose={handleCloseS}
        closeAfterTransition
      >
        <Fade in={openS}>
          <Paper className={classes.paper}>
            {/* Add the Confetti component to create the confetti effect */}
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500} // Adjust the number of confetti pieces
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2}>
                <Iconify icon="icon-park:success" sx={{ height: '1.75rem', width: '1.75rem' }} />
                <Typography variant="h5">Login Successful!</Typography>
              </Stack>
              <IconButton aria-label="close" onClick={handleCloseS} sx={{ ml: 1.5 }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Fade>
      </Modal>
    </Backdrop>
  );
}

Logsuccess.propTypes = {
  openS: PropTypes.bool.isRequired,
  handleCloseS: PropTypes.func.isRequired,
};

export { Logsuccess };
