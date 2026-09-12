// ----------------------------------------------------------------------
// FaMaS — demo-mode request handlers (client/src/api/mock/handlers.js)
//
// Response shapes are dictated by the 17 existing call sites:
//
//   POST /api/auth/login              -> 200 {uid, role} | 200 {message} when banned | 400/401/500
//   POST /api/auth/register           -> 201 created  | 409 email/phone taken
//   GET  /api/auth/getrole            -> 200 {uid, role} (used by routes/components/authcheck.jsx)
//   GET  /api/forgot/userexists/:id   -> 200 {uid} | 400 | 404
//   PUT  /api/forgot/reset            -> 200 {success:true} | 400
//   GET  /api/admin/getdets/:userid   -> {data: {fname, lname, email, phone, address, ...}}
//   GET  /api/admin/farmers           -> {data: [farmer, ...]}
//   GET  /api/admin/farmers/farmsize/:id -> {data: [{size}]}
//   GET  /api/admin/farmers/farms/:id    -> {data: [{count}]}
//   PUT  /api/admin/farmers/ban/:fid  -> 200 | 404
//   PUT  /api/admin/farmers/unban/:fid-> 200 | 404
//   GET  /api/admin/products/:uid     -> {data: [product, ...]}
//   POST /api/admin/products/add      -> 200 {success:true, pid, data:{...}}
//   GET  /api/market/products         -> {data: [product, ...]} (all in-stock, all farmers)
//   POST /api/homepage/contact        -> 200 {success:true}
// ----------------------------------------------------------------------

import {
  addContact,
  addFarmerFromRegistration,
  addProduct,
  findAccountByLogin,
  findAccountByIdentifier,
  setFarmerStatus,
  setPassword,
  store,
} from './store';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
    statusText: status === 200 ? 'OK' : 'Demo',
  });
}

function noContent(status) {
  return new Response(null, { status, headers: JSON_HEADERS });
}

function pathnameOf(path) {
  const raw = String(path || '');
  try {
    return new URL(raw, 'http://demo.local').pathname;
  } catch (error) {
    return raw.split('?')[0];
  }
}

async function readBody(options) {
  const { body } = options || {};
  if (!body) return {};

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (error) {
      return {};
    }
  }

  // FormData / URLSearchParams
  if (typeof body.entries === 'function') {
    return Object.fromEntries(body.entries());
  }

  return {};
}

// The `image_url` read key is kept in sync with the `img_url` request key so
// both /dashboard/products and /marketplace render the same record.
function publicProduct(product) {
  return { ...product, image_url: product.img_url };
}

// ----------------------------------------------------------------------
// handlers
// ----------------------------------------------------------------------

const routes = [
  {
    method: 'POST',
    pattern: /^\/api\/auth\/login$/,
    handle: async (match, options) => {
      const { email, phone, password } = await readBody(options);
      const account = findAccountByLogin({ email, phone });

      if (!account || account.password !== password) {
        return json({ error: 'Invalid credentials' }, 401);
      }

      // The login view treats the presence of a `message` key as "banned".
      if (account.status === 'banned') {
        return json({ message: 'Your account has been banned. Contact the administrator.' }, 200);
      }

      return json({ uid: account.uid, role: account.role });
    },
  },
  {
    method: 'POST',
    pattern: /^\/api\/auth\/register$/,
    handle: async (match, options) => {
      const { email, phone, fname, lname, password } = await readBody(options);
      const emailTaken = email
        ? store.accounts.some(
            (account) => account.email && account.email.toLowerCase() === String(email).toLowerCase()
          )
        : false;
      const phoneTaken = phone
        ? store.accounts.some((account) => account.phone === String(phone))
        : false;

      if (emailTaken || phoneTaken) {
        return json({ error: 'A user with that e-mail or phone already exists' }, 409);
      }

      const farmer = addFarmerFromRegistration({ email, phone, fname, lname });
      const account = store.accounts[store.accounts.length - 1];
      account.password = password || '';

      return json({ success: true, uid: farmer.fid, role: 'farmer' }, 201);
    },
  },
  {
    // Consumed by routes/components/authcheck.jsx (currently commented out):
    // it is a GET with credentials and then compares response.role / response.uid
    // against localStorage. Demo mode has the session in localStorage already, so
    // echo it back instead of pretending to read a cookie.
    method: 'GET',
    pattern: /^\/api\/auth\/getrole$/,
    handle: async () => {
      const storage = typeof localStorage === 'undefined' ? null : localStorage;
      const uid = storage ? storage.getItem('uid') : null;
      const role = storage ? storage.getItem('role') : null;
      return json({ uid, role: role || 'guest' });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/forgot\/userexists\/(.+)$/,
    handle: async (match) => {
      const account = findAccountByIdentifier(decodeURIComponent(match[1]));
      if (!account) {
        return json({ error: 'No account for that e-mail/phone' }, 404);
      }
      return json({ uid: account.uid });
    },
  },
  {
    method: 'PUT',
    pattern: /^\/api\/forgot\/reset$/,
    handle: async (match, options) => {
      const { uid, password } = await readBody(options);
      if (!uid || !password) {
        return json({ error: 'uid and password are required' }, 400);
      }
      const account = setPassword(uid, password);
      if (!account) {
        return json({ error: 'Unknown uid' }, 404);
      }
      return json({ success: true });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/admin\/getdets\/(.+)$/,
    handle: async (match) => {
      const uid = decodeURIComponent(match[1]);
      const account = store.accounts.find((entry) => entry.uid === uid);
      const farmer = store.farmers.find((entry) => entry.fid === uid);

      if (!account && !farmer) {
        return json({ data: {} });
      }

      const source = farmer || account;
      return json({
        data: {
          uid,
          fid: farmer ? farmer.fid : undefined,
          role: account ? account.role : 'farmer',
          fname: source.fname || '',
          lname: source.lname || '',
          displayName:
            source.displayName || `${source.fname || ''} ${source.lname || ''}`.trim(),
          email: source.email || '',
          phone: source.phone || '',
          address: source.address || '',
          village: source.village || '',
          district: source.district || '',
          state: source.state || 'Karnataka',
          farmSize: source.farmSize || 0,
          farms: source.farms || 0,
          cropTypes: source.cropTypes || '',
          status: source.status || 'active',
          joined: source.joined || '',
        },
      });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/admin\/farmers$/,
    handle: async () => json({ data: store.farmers }),
  },
  {
    method: 'GET',
    pattern: /^\/api\/admin\/farmers\/farmsize\/(.+)$/,
    handle: async (match) => {
      const farmer = store.farmers.find((entry) => entry.fid === decodeURIComponent(match[1]));
      if (!farmer) {
        return json({ data: [] });
      }
      return json({ data: [{ size: farmer.farmSize }] });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/admin\/farmers\/farms\/(.+)$/,
    handle: async (match) => {
      const farmer = store.farmers.find((entry) => entry.fid === decodeURIComponent(match[1]));
      if (!farmer) {
        return json({ data: [] });
      }
      return json({ data: [{ count: farmer.farms }] });
    },
  },
  {
    method: 'PUT',
    pattern: /^\/api\/admin\/farmers\/ban\/(.+)$/,
    handle: async (match) => {
      const fid = decodeURIComponent(match[1]);
      if (!setFarmerStatus(fid, 'banned')) {
        return json({ error: 'Unknown farmer' }, 404);
      }
      return json({ success: true, status: 'banned' });
    },
  },
  {
    method: 'PUT',
    pattern: /^\/api\/admin\/farmers\/unban\/(.+)$/,
    handle: async (match) => {
      const fid = decodeURIComponent(match[1]);
      if (!setFarmerStatus(fid, 'active')) {
        return json({ error: 'Unknown farmer' }, 404);
      }
      return json({ success: true, status: 'active' });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/admin\/products\/(.+)$/,
    handle: async (match) => {
      const uid = decodeURIComponent(match[1]);
      const account = store.accounts.find((entry) => entry.uid === uid);
      const isAdmin = account ? account.role === 'admin' : false;

      const products = isAdmin
        ? store.products
        : store.products.filter((product) => product.fid === uid);

      return json({ data: products.map(publicProduct) });
    },
  },
  {
    method: 'POST',
    pattern: /^\/api\/admin\/products\/add$/,
    handle: async (match, options) => {
      const product = addProduct(await readBody(options));
      // The modal checks `data.success` before showing the success dialog.
      return json({ success: true, pid: product.pid, data: publicProduct(product) });
    },
  },
  {
    method: 'GET',
    pattern: /^\/api\/market\/products$/,
    handle: async () =>
      json({ data: store.products.filter((product) => product.stock > 0).map(publicProduct) }),
  },
  {
    method: 'POST',
    pattern: /^\/api\/homepage\/contact$/,
    handle: async (match, options) => {
      addContact(await readBody(options));
      return json({ success: true });
    },
  },
];

// ----------------------------------------------------------------------

export async function handleMockRequest(path, options = {}) {
  const method = String(options.method || 'GET').toUpperCase();
  const pathname = pathnameOf(path);
  const route = routes.find((entry) => entry.method === method && entry.pattern.test(pathname));

  if (!route) {
    console.warn(`[FaMaS demo] no mock handler for ${method} ${pathname}`);
    return json({ error: `No demo handler for ${method} ${pathname}` }, 404);
  }

  const match = pathname.match(route.pattern);
  return route.handle(match, options);
}
