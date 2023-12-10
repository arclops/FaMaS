import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { ProductsView } from '@/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
