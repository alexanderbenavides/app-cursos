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
import AdminTutorials from "../pages/Admin/Tutorials";
import AdminProjects from "../pages/Admin/Projects";

// Pages
import Home from "../pages/Home";
import HomeCourses from "../pages/Home/Courses";
import HomeModules from "../pages/Home/Modules";
import HomeLessons from "../pages/Home/Lessons";
import HomeTutorials from "../pages/Home/Tutorials";
import TutorialContent from "../pages/Home/TutorialContent";
import HomeProjects from "../pages/Home/Projects";
import Attendance from "../pages/Home/attendance";

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
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSingIn,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
      },
      {
        path: "/admin/courses",
        component: AdminCourses,
        exact: true,
      },
      {
        path: "/admin/modules/:courseID",
        component: AdminModules,
        exact: true,
      },
      {
        path: "/admin/lessons/course/:courseID/module/:moduleID",
        component: AdminLessons,
        exact: true,
      },
      {
        path: "/admin/tutorials",
        component: AdminTutorials,
        exact: true,
      },
      {
        path: "/admin/projects",
        component: AdminProjects,
        exact: true,
      },

      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutHome,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/courses/:course",
        component: HomeCourses,
        exact: true,
      },
      {
        path: "/modules/:course",
        component: HomeModules,
        exact: true,
      },
      {
        path:
          "/lessons/course/:course/module/:module/module-title/:moduleTitle",
        component: HomeLessons,
        exact: true,
      },
      {
        path: "/tutorials",
        component: HomeTutorials,
        exact: true,
      },
      {
        path: "/tutorial/:tutorial",
        component: TutorialContent,
        exact: true,
      },
      {
        path: "/projects",
        component: HomeProjects,
        exact: true,
      },
      {
        path: "/attendance",
        component: Attendance,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
