/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';

import { LoginView } from '@/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | FaMaS</title>
      </Helmet>

      <LoginView />
    </>
  );
}
