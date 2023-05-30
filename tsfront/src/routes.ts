import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    DESCRIPTION_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import OrdersPage from "./pages/OrdersPage";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import DescriptionPage from "./pages/DescriptionPage";

export const authRoutes=[
    {
        path:ADMIN_ROUTE,
        Component:Admin
    },
    {
        path:ORDERS_ROUTE,
        Component:OrdersPage
    }

]
export const publicRoutes=[
    {
        path:MAIN_ROUTE,
        Component:Main
    },
    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:DESCRIPTION_ROUTE+'/:id',
        Component:DescriptionPage
    }

]