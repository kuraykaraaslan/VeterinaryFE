'use client';
import React from "react";
import axiosInstance from "@/libs/axios";
import WorkDay from "@/types/WorkDay";
import Doctor from "@/types/Doctor";

const CreateWorkdayPage = () => {
    const [workDate, setWorkDate] = React.useState("");
    const [doctorId, setDoctorId] = React.useState("");

    const [availableDoctors, setAvailableDoctors] = React.useState<Doctor[]>([]);

    React.useEffect(() => {
        axiosInstance.get("/doctors?page=0&size=5000")
            .then((response) => {
                setAvailableDoctors(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!workDate || !doctorId) {
            alert("Please fill all the fields");
            return;
        }

        axiosInstance.post("/available-dates", {
            workDate: workDate,
            doctorId: doctorId
        })
            .then(() => {
                alert("Workday created successfully");
                setWorkDate("");
                setDoctorId("");
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Create Workday</h1>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-lg mt-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="workDate">
                                Work Date
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="workDate"
                                type="date"
                                value={workDate}
                                onChange={(e) => setWorkDate(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doctorId">
                                Doctor
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="doctorId"
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                            >
                                <option value="">Select Doctor</option>
                                {availableDoctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Create Workday
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateWorkdayPage;