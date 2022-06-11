import { Suspense, lazy, useEffect } from "react";
import { Navigate, useRoutes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
// layouts

import DashboardLayout from "../layouts/dashboard";

// config

// components
import LoadingScreen from "../components/LoadingScreen";
import { loadMe } from "../redux/actions/authActions";

// ----------------------------------------------------------------------

const Loadable = Component => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // Render Loading Spinner while app is loading
  const renderLoadingSpinner = () => {
    return (
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />;
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    dispatch(loadMe(navigate));
  }, [loadMe]);

  useEffect(() => {
    if (auth.token === null && !auth.isAuthenticated) {
      dispatch(loadMe(navigate));
    }
  }, [auth.token, auth.isAuthenticated]);

  // Not authenticated routes
  const notAuthenticatedRoutes = useRoutes([
    {
      path: "/login",
      element: <Login />
    }
  ]);

  const authenticatedRoutes = useRoutes([
    {
      path: "/",
      element: <Login />
    },

    // Dashboard Routes
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to='/dashboard/analytics' replace />, index: true },

        { path: "analytics", element: <GeneralAnalytics /> },
        { path: "booking", element: <GeneralBooking /> },

        {
          path: "user",
          children: [
            { element: <Navigate to='/dashboard/user/profile' replace />, index: true },
            { path: "profile", element: <UserProfile /> },
            { path: "cards", element: <UserCards /> },
            { path: "list", element: <UserList /> },
            { path: "new", element: <UserCreate /> },
            { path: ":name/edit", element: <UserCreate /> },
            { path: "account", element: <UserAccount /> }
          ]
        },

        //question
        {
          path: "question",
          children: [
            { element: <Navigate to='/dashboard/question/list' replace />, index: true },
            { path: "list", element: <QuestionList /> }
          ]
        },

        //solution
        {
          path: "solution",
          children: [
            { element: <Navigate to='/dashboard/solution/list' replace />, index: true },
            { path: "list", element: <SolutionList /> }
          ]
        },

        {
          path: "chat",
          children: [
            { element: <Chat />, index: true },
            { path: "new", element: <Chat /> },
            { path: ":conversationKey", element: <Chat /> }
          ]
        },
        { path: "calendar", element: <Calendar /> },
        { path: "kanban", element: <Kanban /> }
      ]
    }
  ]);

  if (!auth.appLoaded) {
    return renderLoadingSpinner();
  }

  return auth.isAuthenticated ? authenticatedRoutes : notAuthenticatedRoutes;
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/auth/Login")));

// Dashboard

const GeneralAnalytics = Loadable(lazy(() => import("../pages/dashboard/GeneralAnalytics")));
const GeneralBooking = Loadable(lazy(() => import("../pages/dashboard/GeneralBooking")));

const UserProfile = Loadable(lazy(() => import("../pages/dashboard/UserProfile")));
const UserCards = Loadable(lazy(() => import("../pages/dashboard/UserCards")));
const UserList = Loadable(lazy(() => import("../pages/dashboard/UserList")));

const QuestionList = Loadable(lazy(() => import("../pages/dashboard/QuestionList")));

const SolutionList = Loadable(lazy(() => import("../pages/dashboard/SolutionList")));

const UserAccount = Loadable(lazy(() => import("../pages/dashboard/UserAccount")));
const UserCreate = Loadable(lazy(() => import("../pages/dashboard/UserCreate")));
const Chat = Loadable(lazy(() => import("../pages/dashboard/Chat")));

const Calendar = Loadable(lazy(() => import("../pages/dashboard/Calendar")));
const Kanban = Loadable(lazy(() => import("../pages/dashboard/Kanban")));
