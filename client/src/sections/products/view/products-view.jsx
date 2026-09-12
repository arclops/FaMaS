import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import getProducts from '../utils/getproducts';
import ProductFilters from '../product-filters';
import Iconify from '../../../components/iconify';
import AddProductModal from '../modals/addproduct';

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [zeroprod, setZeroprod] = useState(false);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      const list = Array.isArray(data) ? data : [];
      setZeroprod(list.length === 0);
      setProducts(list);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setProducts([]);
      setZeroprod(true);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Your Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Button onClick={() => setAddProduct(true)} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} sx={{ mr: 2 }}>
          Add Product
        </Button>

        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={() => setOpenFilter(true)}
            onCloseFilter={() => setOpenFilter(false)}
          />
          <ProductSort />
        </Stack>
      </Stack>
      { !zeroprod &&
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.pid} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      }
      { zeroprod && (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          You have not listed any produce yet. Use Add Product to create the first listing.
        </Typography>
      )}
      <AddProductModal openAP={addProduct} handleCloseAP={() => { setAddProduct(false); loadProducts(); }} />
    </Container>
  );
}
