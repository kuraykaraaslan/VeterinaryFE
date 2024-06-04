'use client';
import React , {useState} from "react";
import axiosInstance from "@/libs/axios";
import WorkDay from "@/types/WorkDay";
import Doctor from "@/types/Doctor";

const WorkdaysPage = () => {
    const [workdays, setWorkdays] = React.useState<WorkDay[]>([]);
    const [doctors, setDoctors] = React.useState<Doctor[]>([]);

    
    const [pageNumber , setPageNumber] = useState(0);
    const [totalPages , setTotalPages] = useState(0);
    const [totalElements , setTotalElements] = useState(0);
    const [pageSize , setPageSize] = useState(5);


    React.useEffect(() => {
        axiosInstance.get("/available-dates" + `?page=${pageNumber}&size=${pageSize}`)
        .then((workdays) => {
            setWorkdays(workdays.data.content);
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });

        axiosInstance.get("/doctors")
        .then((doctors) => {
            setDoctors(doctors.data);
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }, []);

    function getDoctorName(doctorID: number) {
        return doctors.find((doctor) => doctor.id === doctorID)?.name;
    }

    function deleteWorkday(workdayID: string) {
        axiosInstance.delete(`/workdays/${workdayID}`)
        .then(() => {
            setWorkdays(workdays.filter((workday) => workday.id !== workdayID));
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }


    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Workdays</h1>
            </div>
            <div className="flex justify-end">
                <a href="/workdays/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Workday
                </a>
            </div>
            <div className="flex flex-col mt-4">
                <table className="min-w-full table-auto">
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Doctor</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Day</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {workdays.map((workDay) => (
                            <tr className="bg-white border-4 border-gray-200" key={workDay.id}>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{workDay.doctor.name}</span>
                                </td>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{workDay.workDay}</span>
                                </td>
                                <td>
                                    <a href={`/workdays/${workDay.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Details
                                    </a>
                                    <button onClick={() => deleteWorkday(workDay.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WorkdaysPage;