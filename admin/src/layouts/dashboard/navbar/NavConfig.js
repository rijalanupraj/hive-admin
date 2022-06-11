// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  user: getIcon("ic_user"),
  kanban: getIcon("ic_kanban"),
  calendar: getIcon("ic_calendar"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  booking: getIcon("ic_booking"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "analytics website",
        path: PATH_DASHBOARD.general.analytics,
        icon: ICONS.analytics,
      },
      {
        title: "analytics post",
        path: PATH_DASHBOARD.general.booking,
        icon: ICONS.booking,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      // MANAGEMENT : USER
      {
        title: "user",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "Top User", path: PATH_DASHBOARD.user.cards },
          { title: "list", path: PATH_DASHBOARD.user.list },
        ],
      },
      // MANAGEMENT : QUESTION
      {
        title: "question",
        path: PATH_DASHBOARD.question.root,
        icon: ICONS.booking,
        children: [{ title: "list", path: PATH_DASHBOARD.question.list }],
      },

      // MANAGEMENT : SOLUTION
      {
        title: "solution",
        path: PATH_DASHBOARD.solution.root,
        icon: ICONS.booking,
        children: [{ title: "list", path: PATH_DASHBOARD.solution.list }],
      },
      // MANAGEMENT : Category
      {
        title: "category",
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.booking,
        children: [
          { title: "list", path: PATH_DASHBOARD.category.list },
          { title: "new", path: PATH_DASHBOARD.category.newCategory },
        ],
      },

    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: "app",
    items: [
      { title: "chat", path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      {
        title: "calendar",
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      {
        title: "kanban",
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },
];

export default navConfig;
