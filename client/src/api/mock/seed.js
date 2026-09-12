// ----------------------------------------------------------------------
// FaMaS seeded demo data. Fictional people only. Demo logins:
//   ADMIN   admin@famas.demo / 9800000001 / admin123
//   FARMER  karthik.rao@example.com / 9845012345 / farmer123
// ----------------------------------------------------------------------

const PRODUCT_IMAGES = {
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  basmati: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
  ragi: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  toor: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
  moong: 'https://images.unsplash.com/photo-1604329760661-e91dcad3e78c?auto=format&fit=crop&w=800&q=80',
  chana: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
  groundnut: 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?auto=format&fit=crop&w=800&q=80',
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  chilli: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?auto=format&fit=crop&w=800&q=80',
  onion: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=800&q=80',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
  coconut: 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=800&q=80',
};

export const seedAccounts = [
  { uid: 'ADM001', role: 'admin', fname: 'Aravind', lname: 'Shetty', displayName: 'Administrator', photoURL: '/assets/images/avatars/avatar_25.jpg', email: 'admin@famas.demo', phone: '9800000001', password: 'admin123', address: 'FaMaS Head Office, Nitte, Karkala Taluk, Udupi District, Karnataka', status: 'active', joined: '2023-01-09' },
  { uid: 'FID1001', role: 'farmer', farmerId: 'FID1001', fname: 'Karthik', lname: 'Rao', displayName: 'Karthik Rao', photoURL: '/assets/images/avatars/avatar_9.jpg', email: 'karthik.rao@example.com', phone: '9845012345', password: 'farmer123', status: 'active' },
  { uid: 'FID1002', role: 'farmer', farmerId: 'FID1002', fname: 'Lakshmi', lname: 'Gowda', displayName: 'Lakshmi Gowda', photoURL: '/assets/images/avatars/avatar_10.jpg', email: 'lakshmi.gowda@example.com', phone: '9845012346', password: 'farmer123', status: 'banned' },
  { uid: 'FID1003', role: 'farmer', farmerId: 'FID1003', fname: 'Ramesh', lname: 'Naik', displayName: 'Ramesh Naik', photoURL: '/assets/images/avatars/avatar_11.jpg', email: 'ramesh.naik@example.com', phone: '9845012347', password: 'farmer123', status: 'active' },
];

export const seedFarmers = [
  { fid: 'FID1001', fname: 'Karthik', lname: 'Rao', email: 'karthik.rao@example.com', phone: '9845012345', address: 'Hosakere, Karkala Taluk, Udupi District, Karnataka', village: 'Hosakere', district: 'Udupi', state: 'Karnataka', farmSize: 4.5, farms: 2, cropTypes: 'Paddy, Coconut', status: 'active', joined: '2023-06-14' },
  { fid: 'FID1002', fname: 'Lakshmi', lname: 'Gowda', email: 'lakshmi.gowda@example.com', phone: '9845012346', address: 'Bettada Hosur, Sakleshpur Taluk, Hassan District, Karnataka', village: 'Bettada Hosur', district: 'Hassan', state: 'Karnataka', farmSize: 2.75, farms: 1, cropTypes: 'Ragi, Coffee', status: 'banned', joined: '2023-07-02' },
  { fid: 'FID1003', fname: 'Ramesh', lname: 'Naik', email: 'ramesh.naik@example.com', phone: '9845012347', address: 'Kundgol Road, Hubballi Taluk, Dharwad District, Karnataka', village: 'Kundgol', district: 'Dharwad', state: 'Karnataka', farmSize: 6.2, farms: 3, cropTypes: 'Maize, Cotton', status: 'active', joined: '2023-07-28' },
  { fid: 'FID1004', fname: 'Sushma', lname: 'Patil', email: 'sushma.patil@example.com', phone: '9845012348', address: 'Krishnapura, Athani Taluk, Belagavi District, Karnataka', village: 'Krishnapura', district: 'Belagavi', state: 'Karnataka', farmSize: 3.4, farms: 2, cropTypes: 'Sugarcane, Groundnut', status: 'active', joined: '2023-08-11' },
  { fid: 'FID1005', fname: 'Basavaraj', lname: 'Hiremath', email: 'basavaraj.hiremath@example.com', phone: '9845012349', address: 'Hirekerur, Ranebennur Taluk, Haveri District, Karnataka', village: 'Hirekerur', district: 'Haveri', state: 'Karnataka', farmSize: 8.1, farms: 3, cropTypes: 'Sunflower, Jowar', status: 'active', joined: '2023-09-05' },
  { fid: 'FID1006', fname: 'Anitha', lname: 'Kamath', email: 'anitha.kamath@example.com', phone: '9845012350', address: 'Kadri Layout, Mangaluru Taluk, Dakshina Kannada District, Karnataka', village: 'Kadri', district: 'Dakshina Kannada', state: 'Karnataka', farmSize: 1.9, farms: 1, cropTypes: 'Banana, Arecanut', status: 'inactive', joined: '2023-10-19' },
  { fid: 'FID1007', fname: 'Prakash', lname: 'Reddy', email: 'prakash.reddy@example.com', phone: '9845012351', address: 'Yelahanka Hobli, Bengaluru North Taluk, Bengaluru Urban District, Karnataka', village: 'Yelahanka', district: 'Bengaluru Urban', state: 'Karnataka', farmSize: 2.3, farms: 1, cropTypes: 'Tomato, Beans', status: 'active', joined: '2024-01-16' },
  { fid: 'FID1008', fname: 'Sharada', lname: 'Bhat', email: 'sharada.bhat@example.com', phone: '9845012352', address: 'Sirsi Town, Sirsi Taluk, Uttara Kannada District, Karnataka', village: 'Sirsi', district: 'Uttara Kannada', state: 'Karnataka', farmSize: 5.6, farms: 2, cropTypes: 'Arecanut, Pepper', status: 'active', joined: '2024-02-23' },
  { fid: 'FID1009', fname: 'Imran', lname: 'Pasha', email: 'imran.pasha@example.com', phone: '9845012353', address: 'Channapatna Taluk, Ramanagara District, Karnataka', village: 'Channapatna', district: 'Ramanagara', state: 'Karnataka', farmSize: 3.9, farms: 2, cropTypes: 'Mango, Coconut', status: 'active', joined: '2024-04-08' },
];

export const seedProducts = [
  { pid: 'PID2001', pname: 'Sona Masuri Rice', fid: 'FID1001', variants: 3, price: 52, stock: 480, img_url: PRODUCT_IMAGES.rice, sale_status: false, sale_price: 0 },
  { pid: 'PID2002', pname: 'Basmati Rice', fid: 'FID1001', variants: 2, price: 88, stock: 260, img_url: PRODUCT_IMAGES.basmati, sale_status: true, sale_price: 79 },
  { pid: 'PID2003', pname: 'Ragi (Finger Millet)', fid: 'FID1002', variants: 1, price: 41, stock: 350, img_url: PRODUCT_IMAGES.ragi, sale_status: false, sale_price: 0 },
  { pid: 'PID2004', pname: 'Toor Dal', fid: 'FID1003', variants: 2, price: 142, stock: 190, img_url: PRODUCT_IMAGES.toor, sale_status: false, sale_price: 0 },
  { pid: 'PID2005', pname: 'Moong Dal', fid: 'FID1003', variants: 2, price: 118, stock: 165, img_url: PRODUCT_IMAGES.moong, sale_status: true, sale_price: 105 },
  { pid: 'PID2006', pname: 'Bengal Gram (Chana)', fid: 'FID1004', variants: 1, price: 76, stock: 220, img_url: PRODUCT_IMAGES.chana, sale_status: false, sale_price: 0 },
  { pid: 'PID2007', pname: 'Groundnut Kernels', fid: 'FID1004', variants: 2, price: 96, stock: 140, img_url: PRODUCT_IMAGES.groundnut, sale_status: false, sale_price: 0 },
  { pid: 'PID2008', pname: 'Tomato (Hybrid)', fid: 'FID1007', variants: 1, price: 28, stock: 310, img_url: PRODUCT_IMAGES.tomato, sale_status: true, sale_price: 24 },
  { pid: 'PID2009', pname: 'Green Chilli', fid: 'FID1007', variants: 1, price: 34, stock: 95, img_url: PRODUCT_IMAGES.chilli, sale_status: false, sale_price: 0 },
  { pid: 'PID2010', pname: 'Onion (Nashik Red)', fid: 'FID1005', variants: 3, price: 31, stock: 720, img_url: PRODUCT_IMAGES.onion, sale_status: false, sale_price: 0 },
  { pid: 'PID2011', pname: 'Alphonso Mango', fid: 'FID1009', variants: 2, price: 245, stock: 60, img_url: PRODUCT_IMAGES.mango, sale_status: true, sale_price: 219 },
  { pid: 'PID2012', pname: 'Banana (Yelakki)', fid: 'FID1006', variants: 1, price: 46, stock: 180, img_url: PRODUCT_IMAGES.banana, sale_status: false, sale_price: 0 },
  { pid: 'PID2013', pname: 'Coconut (Tender)', fid: 'FID1008', variants: 1, price: 39, stock: 400, img_url: PRODUCT_IMAGES.coconut, sale_status: false, sale_price: 0 },
];
