import Image from "next/image";

import DoctorsPage from "./doctors/page";

// MENU FOR NAVIGATION
export default function Home() {
  return (<>
    <div className="flex h-full w-full items-center justify-center flex-col gap-4 bg-base-200 p-4 rounded-box md:flex-row">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl text-center">Pet Clinic</h1>
        <h2 className="text-2xl text-center">Welcome to the Pet Clinic</h2>
      </div>
      <div className="flex flex-col items-center gap-2">
        <a href="/doctors" className="btn btn-primary text-xl w-64">Doctors</a>
        <a href="/customers" className="btn btn-primary text-xl w-64">Customers</a>
        <a href="/appointments" className="btn btn-primary text-xl w-64">Appointments</a>
        <a href="/animals" className="btn btn-primary text-xl w-64">Animals</a>
        <a href="/vaccination" className="btn btn-primary text-xl w-64">Vaccination</a>
        <a href="/workdays" className="btn btn-primary text-xl w-64">WorkDays</a>
      </div>
    </div>
  </>);

}




