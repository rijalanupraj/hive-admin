// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}


const ROOTS_AUTH = '';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/'),
};



export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },

  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },

  question: {
    root: path(ROOTS_DASHBOARD, '/question'),
    list: path(ROOTS_DASHBOARD, '/question/list'),
  },

  solution: {
    root: path(ROOTS_DASHBOARD, '/solution'),
    list: path(ROOTS_DASHBOARD, '/solution/list'),
  },

  category: {
    root: path(ROOTS_DASHBOARD, '/category'),
    list: path(ROOTS_DASHBOARD, '/category/list'),
    newCategory: path(ROOTS_DASHBOARD, '/category/new'),
  },

  adminuser: {
    root: path(ROOTS_DASHBOARD, '/adminuser'),
    list: path(ROOTS_DASHBOARD, '/adminuser/list'),
    newAdmin: path(ROOTS_DASHBOARD, '/adminuser/new'),
  },
  
};


