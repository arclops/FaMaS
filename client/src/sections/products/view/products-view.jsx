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
// import { products } from '../../../_mock/products';
import AddProductModal from '../modals/addproduct';
import ProductCartWidget from '../product-cart-widget';
// ----------------------------------------------------------------------


export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [zeroprod, setZeroprod] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        if (data === null || data.length === 0) {
          setZeroprod(true);
        } else {
          setZeroprod(false);  // Set zeroRows to false if there are farmers in the database
        }
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
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
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
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
      <AddProductModal openAP={addProduct} handleCloseAP={() => setAddProduct(false)} />

      <ProductCartWidget />
    </Container>
  );
}
