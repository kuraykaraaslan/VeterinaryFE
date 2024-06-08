'use client';
import React from "react";
import axiosInstance from "@/libs/axios";
import Doctor from "@/types/Doctor";
import WorkDay from "@/types/WorkDay";


const EditWorkdayPage = ({ params } : { params: { workdayID: string } }) => {
    const [workDate, setWorkDate] = React.useState("");
    const [doctorId, setDoctorId] = React.useState("");    
    const [doctors, setDoctors] = React.useState<Doctor[]>([]);
    const [availableDates, setAvailableDates] = React.useState<WorkDay[]>([]);

    React.useEffect(() => {
        axiosInstance.get("/doctors")
            .then((response) => {
                setDoctors(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

        axiosInstance.get("/available-dates?page=0&size=5000")
            .then((response) => {
                setAvailableDates(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

        axiosInstance.get(`/available-dates/${params.workdayID}`)
        .then((workday) => {
            console.log(workday);
            const workDate = workday.data as WorkDay;
            console.log(workDate);
            setWorkDate(workDate.workDay);
            setDoctorId(workDate.doctor.id as string);

        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }, [params.workdayID]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!workDate || !doctorId) {
            alert("Please fill all the fields");
            return;
        }

        axiosInstance.put(`/workdays/${params.workdayID}`, {
            workDate,
            doctorId
        })
        .then(() => {
            alert("Workday updated successfully");
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Edit Workday</h1>
            </div>
            <div className="flex justify-center mt-4">
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
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
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doctorId">
                                Doctor
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="doctorId"
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                            >
                                <option value="">Select a doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update Workday
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditWorkdayPage;