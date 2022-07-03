// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/")
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    analytics: path(ROOTS_DASHBOARD, "/analytics"),
    dashboard: path(ROOTS_DASHBOARD, "/dashboard")
  },

  chat: {
    root: path(ROOTS_DASHBOARD, "/chat"),
    new: path(ROOTS_DASHBOARD, "/chat/new"),
    conversation: path(ROOTS_DASHBOARD, "/chat/:conversationKey")
  },
  calendar: path(ROOTS_DASHBOARD, "/calendar"),
  kanban: path(ROOTS_DASHBOARD, "/kanban"),
  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
    cards: path(ROOTS_DASHBOARD, "/user/cards"),
    list: path(ROOTS_DASHBOARD, "/user/list"),
    verifyuser: path(ROOTS_DASHBOARD, "/user/verifyuser"),
    newUser: path(ROOTS_DASHBOARD, "/user/new"),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, "/user/account"),
    
  },

  question: {
    root: path(ROOTS_DASHBOARD, "/question"),
    list: path(ROOTS_DASHBOARD, "/question/list")
  },

  solution: {
    root: path(ROOTS_DASHBOARD, "/solution"),
    list: path(ROOTS_DASHBOARD, "/solution/list")
  },

  category: {
    root: path(ROOTS_DASHBOARD, "/category"),
    list: path(ROOTS_DASHBOARD, "/category/list"),
    suggested: path(ROOTS_DASHBOARD, "/category/suggested")
  },

  comment:{
    root: path(ROOTS_DASHBOARD, "/comment"),
    list: path(ROOTS_DASHBOARD, "/comment/list"),
  },

  adminuser: {
    root: path(ROOTS_DASHBOARD, "/adminuser"),
    list: path(ROOTS_DASHBOARD, "/adminuser/list"),
    newAdmin: path(ROOTS_DASHBOARD, "/adminuser/new")
  },

  reportsolution: {
    root: path(ROOTS_DASHBOARD, "/reportsolution"),
    reportsolutionlist: path(ROOTS_DASHBOARD, "/reportsolution/reportsolutionlist")
  },

  reportquestion: {
    root: path(ROOTS_DASHBOARD, "/reportquestion"),
    reportquestionlist: path(ROOTS_DASHBOARD, "/reportquestion/reportquestionlist")
  },

  reportuser: {
    root: path(ROOTS_DASHBOARD, "/reportuser"),
    reportuserlist: path(ROOTS_DASHBOARD, "/reportuser/reportuserlist"),
    warnuserlist: path(ROOTS_DASHBOARD, "/reportuser/warnuserlist"),
    ticketuserlist: path(ROOTS_DASHBOARD, "/reportuser/ticketuserlist")
  },

};
