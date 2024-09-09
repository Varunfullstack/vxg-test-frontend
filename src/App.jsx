// routes
import { Navigate, Route, Routes } from "react-router-dom";
import { routesData } from "./routes";

// components
import { WithAuth } from "./WithAuth";
import NotFound from "./page/NotFound";

// ----------------------------------------------------------------------

export default function App() {
  const role = localStorage.getItem("role");

  // Function to recursively render routes
  const renderRoutes = (routes) => {
    // Function to process each individual route
    const processRoute = (route) => {
      if (route.redirect) {
        // return navigate(route.redirect, { replace: true });
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to={route.redirect} replace />}
          />
        );
      }
      let Component = route.component;

      // Determine if the route should be hidden based on companyId
      const hide = role && role !== route.permission && route.isProtected;
      if (hide) {
        Component = NotFound;
      } else if (route.isProtected) {
        // Wrap protected route components with authentication
        Component = WithAuth(
          route.component,
          route.permission,
          route.isProtected
        );
      }

      // If the route has nested routes, render them recursively
      if (route.routes) {
        return (
          <Route key={route.path} path={route.path} element={<route.layout />}>
            {route.routes.map(processRoute)}
          </Route>
        );
      }

      // Return the route element
      return (
        <Route key={route.path} path={route.path} element={<Component />} />
      );
    };

    // Map over the routes array and process each route
    return routes.map(processRoute);
  };

  return <Routes>{renderRoutes(routesData)}</Routes>;
}
