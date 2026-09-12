// ----------------------------------------------------------------------
// !!! DEMO MODE — SEEDED IN-MEMORY BACKEND !!!
//
// The handlers in this folder are a stand-in for the Express + Postgres
// backend in ../../../../server, which is NOT deployed for the live demo.
// They serve clearly fictional seed data (see ./seed.js — no real users) and
// answer with real `Response` objects so every existing call site keeps
// working unchanged.
//
// MUTATIONS ARE IN-MEMORY ONLY: banning/unbanning a farmer, adding a product,
// registering an account and the contact form all update ./store.js for the
// current browser session and are DISCARDED on page reload / new tab.
//
// This module is only reached when demo mode is on — see ../client.js
// (VITE_DEMO_MODE === 'true', or VITE_API_URL unset). Turn it off with
// VITE_DEMO_MODE=false + VITE_API_URL=<real backend>.
// ----------------------------------------------------------------------

export { handleMockRequest } from './handlers';
