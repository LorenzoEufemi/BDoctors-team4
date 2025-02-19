import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const logo = `/miodottore-mktpl-symbol-turquoise.png`;

function AppNavbar() {
    const navLinks = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/contact-us",
            title: "Contattaci"
        },
        {
            path: "/login",
            title: "Accedi"
        }
    ];

    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const closeDropdown = () => setDropdownOpen(false);
        window.addEventListener("resize", closeDropdown);
        return () => window.removeEventListener("resize", closeDropdown);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2B6394" }}>
            <div className="container-fluid d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <NavLink to="/" className="d-flex align-items-center text-decoration-none">
                        <span className="h3 ms-2 text-white mt-4" style={{ lineHeight: '30px' }}>BDoctors</span>
                        <img src="/whiteLogo.png" alt="Logo" width="80" height="60" className="d-inline-block rounded-circle" />
                      
                    </NavLink>
                </div>
                <div className="d-none d-lg-flex">
                    <ul className="navbar-nav ms-auto d-flex">
                        {navLinks.map((curLink, index) => (
                            <li key={index} className="nav-item">
                                <NavLink to={curLink.path} className="nav-link mx-2 text-white">
                                    {curLink.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="d-lg-none position-relative">
                    <button
                        className="btn btn-outline-light"
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{ backgroundColor: "rgba(23, 164, 138, 0.2)" }}
                    >
                        ☰
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu dropdown-menu-end show shadow border-0 rounded" style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#2B6394" }}>
                            {navLinks.map((curLink, index) => (
                                <li key={index}>
                                    <NavLink to={curLink.path} className="dropdown-item text-white" onClick={() => setDropdownOpen(false)}>
                                        {curLink.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;