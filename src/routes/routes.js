import Dashboard from "@material-ui/icons/Dashboard";

import DashboardView from "../components/DashboardView";


const routes = [
  {
    icon: Dashboard,
    name: "Dashboard",
    layout: "/departmentHead",
    path: "/dashboard",
    component: DashboardView,
    authReuired: true
  }
];

export default routes;
