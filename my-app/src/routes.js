import Admin from "./pages/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, SERVICES_ROUTE, STAFF_ROUTE} from "./utils/consts";
import Main from "./pages/Main";
import ServicesPage from "./pages/ServicesPage";
import Auth from "./pages/Auth";
import StaffPage from "./pages/StaffPage";

export const authRoutes=[

    {
        path:ADMIN_ROUTE,
        Component:Admin
    }

]
export const publicRoutes=[
    {
        path:MAIN_ROUTE,
        Component:Main
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },
    {
        path:SERVICES_ROUTE +'/:id',
        Component:ServicesPage
    },
    {
        path:STAFF_ROUTE +'/:id',
        Component:StaffPage
    },
]
