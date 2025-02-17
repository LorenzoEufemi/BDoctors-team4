import AppFooter from "../components/footer/AppFooter";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/header/AppHeader";

function AppLayout() {
    return (
        <>
            <div className="wrapper">
                <AppHeader />
                <main>
                    <Outlet />
                </main>
                <AppFooter />
            </div>
        </>
    )
};

export default AppLayout;