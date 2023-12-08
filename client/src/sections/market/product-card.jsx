import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Label from '../../components/label';
import { fCurrency } from '../../utils/format-number';
// import { ColorPreview } from '../../components/color-utils';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.sale_status && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      SALE
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.pname}
      src={product.image_url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.sale_status && `₹${fCurrency(product.price)}`}
      </Typography>
      &nbsp;
      {product.sale_status ? `₹${fCurrency(product.sale_price)}` : `₹${fCurrency(product.price)}`}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.sale_status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.pname}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="text.secondary">
            <Tooltip title="Available Stock" arrow>{product.stock}</Tooltip>
          </Typography>
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
