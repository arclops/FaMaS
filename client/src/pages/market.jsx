import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { MarketView } from 'src/sections/market/view';

// ----------------------------------------------------------------------

export default function MarketPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <MarketView />
    </>
  );
}
