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
  dashboard: getIcon("ic_dashboard"),
  user: getIcon("ic_user"),
  admin: getIcon("ic_admin"),
  question: getIcon("ic_question"),
  solution: getIcon("ic_solution"),
  category: getIcon("ic_category"),
  comment: getIcon("ic_comment"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.general.dashboard,
        icon: ICONS.dashboard,
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
          // { title: "Top User", path: PATH_DASHBOARD.user.cards },
          { title: "list", path: PATH_DASHBOARD.user.list },
          { title: "Verify User", path: PATH_DASHBOARD.user.verifyuser },
        ],
      },
      // MANAGEMENT : admin User
      {
        title: "admin user",
        path: PATH_DASHBOARD.adminuser.root,
        icon: ICONS.admin,
        children: [
          { title: "list", path: PATH_DASHBOARD.adminuser.list },
          // { title: "new", path: PATH_DASHBOARD.adminuser.newAdmin }
        ],
      },

      // MANAGEMENT : QUESTION
      {
        title: "question",
        path: PATH_DASHBOARD.question.root,
        icon: ICONS.question,
        children: [{ title: "list", path: PATH_DASHBOARD.question.list }],
      },

      // MANAGEMENT : SOLUTION
      {
        title: "solution",
        path: PATH_DASHBOARD.solution.root,
        icon: ICONS.solution,
        children: [{ title: "list", path: PATH_DASHBOARD.solution.list }],
      },
      // MANAGEMENT : Category
      {
        title: "category",
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.category,
        children: [
          { title: "list", path: PATH_DASHBOARD.category.list },
          { title: "suggested", path: PATH_DASHBOARD.category.suggested },
        ],
      },
      //comment
      {
        title: "comment",
        path: PATH_DASHBOARD.comment.root,
        icon: ICONS.comment,
        children: [
          { title: "list", path: PATH_DASHBOARD.comment.list },
        ],
      },
    ],
  },

  // REPORT
  {
    subheader: "Report",
    items: [
      // REPORT : USER
      {
        title: "User Report",
        path: PATH_DASHBOARD.reportuser.root,
        icon: ICONS.user,
        children: [
          { title: "List", path: PATH_DASHBOARD.reportuser.reportuserlist },
          { title: "Warn", path: PATH_DASHBOARD.reportuser.warnuserlist },
          { title: "Ticket", path: PATH_DASHBOARD.reportuser.ticketuserlist },
        ],
      },
      // REPORT : question
      {
        title: "Question Report",
        path: PATH_DASHBOARD.reportquestion.root,
        icon: ICONS.question,
        children: [
          {
            title: "List",
            path: PATH_DASHBOARD.reportquestion.reportquestionlist,
          },
        ],
      },
      // REPORT : solution
      {
        title: "Solution Report",
        path: PATH_DASHBOARD.reportsolution.root,
        icon: ICONS.solution,
        children: [
          {
            title: "List",
            path: PATH_DASHBOARD.reportsolution.reportsolutionlist,
          },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: "app",
  //   items: [
  //     { title: "chat", path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     {
  //       title: "calendar",
  //       path: PATH_DASHBOARD.calendar,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: "kanban",
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
