
'use client';
import React, { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import Appointment from "@/types/Appointment";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);

    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(5);


    React.useEffect(() => {
        axiosInstance.get("/appointments" + `?page=${pageNumber}&size=${pageSize}`)
            .then((response) => {
                setAppointments(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }
    , []);

    function handleDelete(id: string) {
        confirm("Are you sure you want to delete this appointment?") &&
            axiosInstance.delete(`/appointments/${id}`)
                .then(() => {
                    setAppointments(appointments.filter((appointment) => appointment.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred. Please try again later.");
                });
    };

    function goToAnimal(appointment: Appointment) {
        const id = appointment.animal ? appointment.animal.id : "";
        window.location.href = `/animals/${id}`;
    }

    function goToDoctor(appointment: Appointment) {
        const id = appointment.doctor ? appointment.doctor.id : "";
        window.location.href = `/doctors/${id}`;
    }

    function goToEdit(appointment: Appointment) {
        const id = appointment.id ? appointment.id : "";
        window.location.href = `/appointments/${id}`;
    }

    function goToReport(appointment: Appointment) {
        const id = appointment.id ? appointment.id : "";
        window.location.href = `/appointments/${id}/report`;
    }

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Appointments</h1>
            </div>
            <div className="flex justify-end">
                <a href="/appointments/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Appointment
                </a>
            </div>
            <div className="flex flex-col mt-4">
                <table className="min-w-full table-auto">
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Date</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Doctor</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Animal</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id} className="bg-white border-b">
                                <td className="px-16 py-2">
                                    {appointment.appointmentDate}
                                </td>
                                <td className="px-16 py-2">
                                    {appointment.doctor?.name}
                                </td>
                                <td className="px-16 py-2">
                                    <a href={`/animals/${appointment.animal?.id}`}>{appointment.animal?.name}</a>
                                </td>
                                <td className="px-16 py-2 gap-2">
                                    <button onClick={() => goToReport(appointment)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-1 mr-2">
                                        Report
                                    </button>
                                    <button onClick={() => goToEdit(appointment)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-1 mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => goToDoctor(appointment)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-1 mr-2">
                                        Doctor
                                    </button>
                                    <button onClick={() => goToAnimal(appointment)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-1 mr-2">
                                        Animal
                                    </button>
                                    <button onClick={() => handleDelete(appointment.id as string

                                    )} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

export default AppointmentsPage;
