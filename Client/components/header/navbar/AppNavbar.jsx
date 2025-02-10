import { NavLink } from "react-router-dom";
import styles from './AppNavbar.module.css'; 

function AppNavbar() {

    const navLinks = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/accedi",
            title: "Accedi"
        }
    ];

    return (
        <section>
            <div className={styles.navbar}>
                <NavLink to="/" className={styles.textLogo}>BDoctors</NavLink>
                <ul className={styles.navLinks}>
                    {navLinks.map((curLink, index) => (
                        <li key={index}>
                            <NavLink
                                to={curLink.path}
                                className={({ isActive }) =>
                                    isActive ? styles.navLinkActive : styles.navLink
                                }
                            >
                                {curLink.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AppNavbar;