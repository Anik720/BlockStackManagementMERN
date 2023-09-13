import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";
import RequireAuth from "../RequireAuth/RequireAuth";
import ReportDetails from "../components/ReportDetails/ReportDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/report-detail/:mode/:id",
    element: (
      <RequireAuth>
        <ReportDetails />
      </RequireAuth>
    ),
  },
]);

export default router;
