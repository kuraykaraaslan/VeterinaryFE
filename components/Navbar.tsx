'use client';
import React from "react";

const Navbar: React.FC = () => {

    const [path, setPath] = React.useState(window.location.pathname);

    React.useEffect(() => {
        const handleRouteChange = () => {
            setPath(window.location.pathname);
        };

        window.addEventListener("popstate", handleRouteChange);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
        };
    }, []);

    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Veterinary Clinic</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 hidden md:flex">
                    <li>
                    <a href="/doctors" className={"btn btn-ghost " + (path.startsWith("/doctors") ? "btn-active" : "")}>Doctors</a>
                    </li>
                    <li><a href="/customers" className={"btn btn-ghost " + (path.startsWith("/customers") ? "btn-active" : "")}>Customers</a></li>
                    <li><a href="/appointments" className={"btn btn-ghost " + (path.startsWith("/appointments") ? "btn-active" : "")}>Appointments</a></li>
                    <li><a href="/animals" className={"btn btn-ghost " + (path.startsWith("/animals") ? "btn-active" : "")}>Animals</a></li>
                    <li><a href="/vaccines" className={"btn btn-ghost " + (path.startsWith("/vaccines") ? "btn-active" : "")}>Vaccines</a></li>
                    <li><a href="/workdays" className={"btn btn-ghost " + (path.startsWith("/workdays") ? "btn-active" : "")}>WorkDays</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;