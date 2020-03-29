// Layout
import LayoutAdmin from "../layouts/Admin";
import LayoutHome from "../layouts/Home";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminCourses from "../pages/Admin/Courses";
import AdminModules from "../pages/Admin/Modules";
import AdminLessons from "../pages/Admin/Lessons";

// Pages
import Home from "../pages/Home";
import HomeModules from "../pages/Home/Modules";
// import Courses from "../pages/Courses";
// import Blog from "../pages/Blog";

// Other
import Error404 from "../pages/Error";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true
      },
      {
        path: "/admin/login",
        component: AdminSingIn,
        exact: true
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true
      },
      {
        path: "/admin/courses",
        component: AdminCourses,
        exact: true
      },
      {
        path: "/admin/modules/:courseID",
        component: AdminModules,
        exact: true
      },
      {
        path: "/admin/lessons",
        component: AdminLessons,
        exact: true
      },
      {
        component: Error404
      }
    ]
  },
  {
    path: "/",
    component: LayoutHome,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true
      },
      {
        path: "/modules",
        component: HomeModules,
        exact: true
      },
      //   {
      //     path: "/courses",
      //     component: Courses,
      //     exact: true
      //   },
      //   {
      //     path: "/blog",
      //     component: Blog,
      //     exact: true
      //   },
      //   {
      //     path: "/blog/:url",
      //     component: Blog,
      //     exact: true
      //   },
      {
        component: Error404
      }
    ]
  }
];

export default routes;
