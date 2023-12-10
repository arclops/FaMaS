import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { AppView } from '@/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <AppView />
    </>
  );
}
