import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { FarmersDB } from 'src/sections/farmersdb/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <FarmersDB />
    </>
  );
}
