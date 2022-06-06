// routes

// components
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
  {
    subheader: 'general',
    items: [
      { title: 'app', path: '/', icon: ICONS.dashboard },
      { title: 'e-commerce', path: '/', icon: ICONS.ecommerce },
      { title: 'analytics', path: '/', icon: ICONS.analytics },
      { title: 'banking', path: '/', icon: ICONS.banking },
      { title: 'booking', path: '/', icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: '/',
        icon: ICONS.user,
        children: [
          { title: 'profile', path: '/' },
          { title: 'cards', path: '/' },
          { title: 'list', path: '/' },
          { title: 'create', path: '/' },
          { title: 'edit', path: '/' },
          { title: 'account', path: '/' },
        ],
      },

      // MANAGEMENT : E-COMMERCE
      {
        title: 'e-commerce',
        path: '/',
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: '/' },
          { title: 'product', path: '/' },
          { title: 'list', path: '/' },
          { title: 'create', path: '/' },
          { title: 'edit', path: '/' },
          { title: 'checkout', path: '/' },
          { title: 'invoice', path: '/' },
        ],
      },

      // MANAGEMENT : BLOG
      {
        title: 'blog',
        path: '/',
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: '/' },
          { title: 'post', path: '/' },
          { title: 'new post', path: '/' },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: '/',
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: 'chat', path: '/', icon: ICONS.chat },
      { title: 'calendar', path: '/', icon: ICONS.calendar },
      {
        title: 'kanban',
        path: '/',
        icon: ICONS.kanban,
      },
    ],
  },
];

export default navConfig;
