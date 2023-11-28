import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function TableEmptyRows({ emptyRows, height }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
      <Typography variant="body2" sx={{ textAlign: 'center' }}>No Farmers Found!</Typography>
    </TableRow>
  );
}

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};
