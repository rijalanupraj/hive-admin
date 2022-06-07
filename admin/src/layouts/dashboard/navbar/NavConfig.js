// routes

// components
import { filledInputClasses } from '@mui/material';
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------


  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    path: '/management',	
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: '/',
        icon: ICONS.user,
        children: [
          { title: 'profile', path: '/home' },
          { title: 'cards', path: '/card' },
          { title: 'list', path: '/user' },
          { title: 'create', path: '/create' },
          { title: 'edit', path: '/edit' },
          { title: 'account', path: '/account' },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    path: '/app',
    items: [

      { title: 'chat', path: '/chat', icon: ICONS.chat },
      { title: 'calendar', path: '/calendar', icon: ICONS.calendar },
      {
        title: 'kanban',
        path: '/kanban',
        icon: ICONS.kanban,
      },
    ],
  },
];

export default navConfig;
