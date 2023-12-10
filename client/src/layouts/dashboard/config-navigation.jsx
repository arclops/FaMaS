/* eslint-disable import/no-unresolved */
import SvgColor from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Admin dashboard',
    path: '/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User Management',
    path: '/admin/farmers',
    icon: icon('ic_user'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Unauthorized',
    path: '/unauthorized',
    icon: icon('ic_disabled'),
  }
];

export default navConfig;
