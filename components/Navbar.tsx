'use client';
import { useRouter, usePathname } from 'next/navigation'
import React from "react";

const Navbar: React.FC = () => {

    const [path, setPath] = React.useState("");

    const pathname = usePathname();

    React.useEffect(() => {
        const handleRouteChange = () => {
            console.log("Route changed to: ", pathname);
            setPath(pathname);
        };

        window.addEventListener("popstate", handleRouteChange);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
        };
    }, []);

    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">

                <a className="btn btn-ghost text-xl" href="/">Veterinary Clinic</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 hidden md:flex">
                    <li>
                    <a href="/doctors" className={"btn btn-ghost " + (path.startsWith("/doctors") ? "btn-active" : "")}>Doctors</a>
                    </li>
                    <li><a href="/customers" className={"btn btn-ghost " + (path.startsWith("/customers") ? "btn-active" : "")}>Customers</a></li>
                    <li><a href="/appointments" className={"btn btn-ghost " + (path.startsWith("/appointments") ? "btn-active" : "")}>Appointments</a></li>
                    <li><a href="/animals" className={"btn btn-ghost " + (path.startsWith("/animals") ? "btn-active" : "")}>Animals</a></li>
                    <li><a href="/vaccinations" className={"btn btn-ghost " + (path.startsWith("/vaccination") ? "btn-active" : "")}>Vaccination</a></li>
                    <li><a href="/workdays" className={"btn btn-ghost " + (path.startsWith("/workdays") ? "btn-active" : "")}>WorkDays</a></li>
                    <li><a href="/reports" className={"btn btn-ghost " + (path.startsWith("/reports") ? "btn-active" : "")}>Reports</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;