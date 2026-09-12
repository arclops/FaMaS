import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

const sections = [
  { label: 'Overview', hash: '#overview' },
  { label: 'Features', hash: '#features' },
  { label: 'Try it', hash: '#try-it' },
  { label: 'Contact', hash: '#contact' },
];

export default function AppHeader() {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  // In-page anchors only resolve on the landing route, so they are rendered as
  // plain hashes there and as `/#section` links everywhere else.
  const anchorFor = (hash) => (pathname === '/' ? hash : `/${hash}`);

  const closeMenu = () => setOpenMenu(false);

  const renderSectionLink = (section) => (
    <Link
      key={section.hash}
      href={anchorFor(section.hash)}
      underline="none"
      onClick={closeMenu}
      sx={{
        px: 1.5,
        py: 1,
        borderRadius: 1,
        color: 'text.primary',
        typography: 'subtitle2',
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
        '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
      }}
    >
      {section.label}
    </Link>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            component="img"
            src="/assets/Logo.png"
            alt="FaMaS logo"
            sx={{ width: 44, height: 30, objectFit: 'contain' }}
          />
          <Box sx={{ typography: 'h6', color: 'text.primary' }}>FaMaS</Box>
        </Stack>

        <Stack
          component="nav"
          aria-label="Main navigation"
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {sections.map(renderSectionLink)}

          <Link
            component={RouterLink}
            to="/marketplace"
            underline="none"
            sx={{ px: 1.5, py: 1, color: 'text.primary', typography: 'subtitle2' }}
          >
            Marketplace
          </Link>

          <Button component={RouterLink} to="/login" color="inherit" sx={{ ml: 1 }}>
            Log in
          </Button>
          <Button component={RouterLink} to="/register" variant="contained" color="primary">
            Register
          </Button>
        </Stack>

        <IconButton
          aria-label={openMenu ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={openMenu}
          aria-controls="landing-mobile-nav"
          onClick={() => setOpenMenu((open) => !open)}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, border: 1, borderColor: 'divider' }}
        >
          {openMenu ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Stack>

      {openMenu && (
        <Stack
          component="nav"
          id="landing-mobile-nav"
          aria-label="Main navigation"
          spacing={1}
          sx={{ pb: 2, display: { md: 'none' } }}
        >
          {sections.map(renderSectionLink)}

          <Link
            component={RouterLink}
            to="/marketplace"
            underline="none"
            onClick={closeMenu}
            sx={{ px: 1.5, py: 1, color: 'text.primary', typography: 'subtitle2' }}
          >
            Marketplace
          </Link>

          <Button component={RouterLink} to="/login" color="inherit" variant="outlined" onClick={closeMenu}>
            Log in
          </Button>
          <Button component={RouterLink} to="/register" variant="contained" onClick={closeMenu}>
            Register
          </Button>
        </Stack>
      )}
    </Container>
  );
}
