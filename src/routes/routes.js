import Dashboard from "@material-ui/icons/Dashboard";
import DashboardView from "../components/DashboardView";


const routes = [
  {
    path: "/dashboard",
    icon: Dashboard,
    name: "Dashboard",
    component: DashboardView,
    layout: "/admin",
    authReuired: true
  }
];

export default routes;
