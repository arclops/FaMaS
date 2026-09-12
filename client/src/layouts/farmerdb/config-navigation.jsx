/* eslint-disable import/no-unresolved */
import SvgColor from '../../components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Inventory',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Marketplace',
    path: '/marketplace',
    icon: icon('ic_cart'),
  }
];

export default navConfig;
