import AppFooter from "../components/footer/AppFooter";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/header/AppHeader";

function AppLayout() {
    return (
        <>
            
                    <AppHeader />
                    <main className="container">
                        <Outlet />
                    </main>
                    <AppFooter />
                

           
        </>
    )
};

export default AppLayout;