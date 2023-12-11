/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Registration </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
