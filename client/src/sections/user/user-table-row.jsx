/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '@/components/label';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  avatarUrl,
  contact,
  address,
  totfarms,
  totsize,
  status,
  selected,
  handleClick,
  fid,
}) {
  const [open, setOpen] = useState(null);

  const handleBan = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/farmers/ban/${fid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      handleCloseMenu();
      window.location.reload();
    }
  };

  const handleUnban = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/farmers/unban/${fid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      handleCloseMenu();
      window.location.reload();
    }
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow key = {fid} hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align='center'>{contact}</TableCell>

        <TableCell sx={{ maxWidth: 350 }}>{address}</TableCell>
        <TableCell align='center'>{totfarms}</TableCell>
        <TableCell align='center'>{totsize}</TableCell>
        <TableCell>
          <Label color={(status === 'inactive' && 'warning') || (status === 'banned' && 'error') || 'success'}>
            {status}
          </Label>
        </TableCell>


        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        { (status === 'active' || status === 'inactive') && (
          <MenuItem onClick={handleBan}>
            <Iconify icon="ion:ban-outline" sx={{ mr: 2, color: 'red'}} />
            Ban
          </MenuItem>
        )}
        
        { status === 'banned' && (
          <MenuItem onClick={handleUnban}>
            <Iconify icon="solar:user-plus-linear" sx={{ mr: 2, color: 'green'}} />
            UnBan
          </MenuItem>
        )}
        
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  contact: PropTypes.any,
  handleClick: PropTypes.func,
  address: PropTypes.any,
  name: PropTypes.any,
  totfarms: PropTypes.any,
  totsize: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  fid: PropTypes.any,  // Use fid or another unique identifier as the key
};
