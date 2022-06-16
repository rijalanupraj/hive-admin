import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import mailReducer from "./slices/mail";
import chatReducer from "./slices/chat";
import productReducer from "./slices/product";
import calendarReducer from "./slices/calendar";
import kanbanReducer from "./slices/kanban";
import AuthReducer from "./reducers/authReducer";
import UsersReducer from "./reducers/usersReducer";
import QuestionReducer from "./reducers/questionReducer";
import SolutionReducer from "./reducers/solutionReducer";
import CategoryReducer from "./reducers/categoryReducer";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: []
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"]
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  auth: AuthReducer,
  users: UsersReducer,
  question: QuestionReducer,
  solution: SolutionReducer,
  category: CategoryReducer
});

export { rootPersistConfig, rootReducer };
