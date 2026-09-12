import { useMemo, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import '../../landingpage/App.css';
import AppHeader from '../../landingpage/components/header';
import AppFooter from '../../landingpage/components/footer';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import getProducts from './utils/getproducts';
import ProductFilters from '../product-filters';

function sortProducts(list, sortBy) {
  const next = [...list];
  if (sortBy === 'priceAsc') {
    next.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'priceDesc') {
    next.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === 'featured') {
    next.sort((a, b) => Number(b.sale_status) - Number(a.sale_status));
  }
  return next;
}

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching marketplace products:', err.message);
        setError('Could not load the marketplace.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const visible = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  return (
    <div className="famas-landing">
      <header className="famas-header">
        <AppHeader />
      </header>

      <Container sx={{ py: 6 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 4 }}>
          <div>
            <Typography variant="h3">Marketplace</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Produce listed by association members. Demo stock — nothing here is for real sale.
            </Typography>
          </div>
          <Button component={RouterLink} to="/login" variant="contained">
            Sell your produce
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 4 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={() => setOpenFilter(true)}
            onCloseFilter={() => setOpenFilter(false)}
          />
          <ProductSort sortBy={sortBy} onSort={setSortBy} />
        </Stack>

        {loading && (
          <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>
            Loading produce…
          </Typography>
        )}

        {!loading && error && (
          <Typography color="error" sx={{ py: 8, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {!loading && !error && visible.length === 0 && (
          <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>
            No produce is listed right now.
          </Typography>
        )}

        {!loading && visible.length > 0 && (
          <Grid container spacing={3}>
            {visible.map((product) => (
              <Grid key={product.pid} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <AppFooter />
    </div>
  );
}
