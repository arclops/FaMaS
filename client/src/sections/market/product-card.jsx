import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Label from '../../components/label';
import { fCurrency } from '../../utils/format-number';

const FALLBACK_IMG = '/assets/placeholder.svg';

export default function ShopProductCard({ product }) {
  const name = product.pname || product.name || 'Unnamed produce';
  const image = product.image_url || product.cover || FALLBACK_IMG;
  const onSale = Boolean(product.sale_status || product.status === 'sale');
  const price = product.price;
  const salePrice = product.sale_price ?? product.priceSale;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {onSale && (
          <Label
            variant="filled"
            color="error"
            sx={{ zIndex: 9, top: 16, right: 16, position: 'absolute', textTransform: 'uppercase' }}
          >
            SALE
          </Label>
        )}
        <Box
          component="img"
          alt={name}
          src={image}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMG;
          }}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      </Box>

      <Stack spacing={1.5} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        {product.farmer_name && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {product.farmer_name}
          </Typography>
        )}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Tooltip title="Available stock" arrow>
            <Typography color="text.secondary">{product.stock ?? ''}{product.stock != null ? ' kg' : ''}</Typography>
          </Tooltip>
          <Typography variant="subtitle1">
            {onSale && salePrice != null && (
              <Typography component="span" variant="body2" sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.75 }}>
                ₹{fCurrency(price)}
              </Typography>
            )}
            ₹{fCurrency(onSale && salePrice != null ? salePrice : price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
