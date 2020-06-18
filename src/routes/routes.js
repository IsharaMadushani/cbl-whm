import Dashboard from "@material-ui/icons/Dashboard";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardView from "../components/DashboardView";
import SignInView from "../components/SignInView";


const routes = [
  {
    path: "/dashboard",
    icon: Dashboard,
    name: "Dashboard",
    component: DashboardView,
    layout: "/admin"
  },
  {
    path: "/signin",
    icon: ExitToAppIcon,
    name: "SignIn",
    component: SignInView,
    layout: "/admin"
  },
];


export default routes;
