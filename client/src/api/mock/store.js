// ----------------------------------------------------------------------
// FaMaS — in-memory demo store (client/src/api/mock/store.js)
//
// A single mutable object per browser session. It is seeded from ./seed on
// module load and every mutation (ban/unban, product insert, register,
// password reset, contact message) writes here so the rest of the demo sees
// it. Nothing is persisted: a page reload resets the store to the seed.
// ----------------------------------------------------------------------

import { seedAccounts, seedFarmers, seedProducts } from './seed';

const clone = (value) => JSON.parse(JSON.stringify(value));

export const store = {
  accounts: clone(seedAccounts),
  farmers: clone(seedFarmers),
  products: clone(seedProducts),
  contacts: [],
  // Auto-increment counter for newly registered farmers / products.
  seq: 1000,
};

export function nextId(prefix) {
  store.seq += 1;
  return `${prefix}${store.seq}`;
}

// ----------------------------------------------------------------------
// lookups
// ----------------------------------------------------------------------

export function findAccountByLogin({ email, phone }) {
  const normalizedEmail = email ? String(email).trim().toLowerCase() : '';
  const normalizedPhone = phone ? String(phone).trim() : '';

  return store.accounts.find(
    (account) =>
      (normalizedEmail && account.email && account.email.toLowerCase() === normalizedEmail) ||
      (normalizedPhone && account.phone === normalizedPhone)
  );
}

// The forgot-password UI sends whatever the user typed into the single
// email-or-phone field, so match uid, e-mail or phone.
export function findAccountByIdentifier(value) {
  const raw = value ? String(value).trim() : '';
  const normalized = raw.toLowerCase();

  return store.accounts.find(
    (account) =>
      account.uid === raw ||
      (account.email && account.email.toLowerCase() === normalized) ||
      account.phone === raw
  );
}

export function findFarmerByFid(value) {
  const raw = value ? String(value).trim() : '';
  return store.farmers.find((farmer) => farmer.fid === raw);
}

export function findFarmerByUid(value) {
  const raw = value ? String(value).trim() : '';
  return store.farmers.find((farmer) => farmer.fid === raw || farmer.email === raw);
}

// ----------------------------------------------------------------------
// mutations
// ----------------------------------------------------------------------

export function setFarmerStatus(fid, status) {
  const farmer = findFarmerByFid(fid);
  if (!farmer) return null;

  farmer.status = status;
  store.accounts
    .filter((account) => account.farmerId === fid || account.uid === fid)
    .forEach((account) => {
      account.status = status;
    });

  return farmer;
}

export function addProduct(payload) {
  const product = {
    pid: nextId('PID'),
    pname: payload.pname || 'Untitled product',
    fid: payload.fid || null,
    variants: Number(payload.variants) || 1,
    price: Number(payload.price) || 0,
    stock: Number(payload.stock) || 0,
    img_url: payload.img_url || '/assets/placeholder.svg',
    sale_status: Boolean(payload.sale_status),
    sale_price: Number(payload.sale_price) || 0,
  };

  store.products.push(product);
  return product;
}

export function addFarmerFromRegistration({ email, phone, fname, lname }) {
  const uid = nextId('FID');
  const farmer = {
    fid: uid,
    fname: fname || '',
    lname: lname || '',
    email: email || '',
    phone: phone || '',
    address: 'Address not provided',
    village: 'Not provided',
    district: 'Not provided',
    state: 'Karnataka',
    farmSize: 0,
    farms: 0,
    cropTypes: 'Not provided',
    status: 'active',
    joined: new Date().toISOString().slice(0, 10),
  };

  store.farmers.push(farmer);
  store.accounts.push({
    uid,
    role: 'farmer',
    farmerId: uid,
    fname: farmer.fname,
    lname: farmer.lname,
    displayName: `${farmer.fname} ${farmer.lname}`.trim(),
    photoURL: '/assets/images/avatars/avatar_12.jpg',
    email: farmer.email,
    phone: farmer.phone,
    password: '',
    status: 'active',
  });

  return farmer;
}

export function setPassword(uid, password) {
  const account = store.accounts.find((entry) => entry.uid === uid);
  if (!account) return null;

  account.password = password;
  return account;
}

export function addContact(message) {
  store.contacts.push({ ...message, receivedAt: new Date().toISOString() });
  return store.contacts.length;
}
