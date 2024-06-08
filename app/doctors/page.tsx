'use client';
import React , { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";

import Doctor from "../../types/Doctor";


const DoctorsPage = () => {

    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const [pageNumber , setPageNumber] = useState(0);
    const [totalPages , setTotalPages] = useState(0);
    const [totalElements , setTotalElements] = useState(0);
    const [pageSize , setPageSize] = useState(5);

    useEffect(() => {
        axiosInstance.get(`/doctors?page=${pageNumber}&size=${pageSize}`)
        .then((response) => {
            console.log(response.data);
            setDoctors(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [pageNumber, pageSize]);

    function handleDelete(id: string) {
        // confirm dialog
        confirm("Are you sure you want to delete this doctor?") &&
        axiosInstance.delete(`/doctors/${id}`)
        .then(() => {
            setDoctors(doctors.filter((doctor) => doctor.id !== id));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Doctors</h1>
            </div>
            <div className="flex justify-end">
                <a href="/doctors/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Doctor
                </a>
            </div>
            <div className="flex flex-col mt-4">
                <table className="min-w-full table-auto">
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Name</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Email</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Phone</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Address</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">City</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {doctors.map((doctor) => (
                            <tr className="bg-white border-4 border-gray-200" key={doctor.id}>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{doctor.name}</span>
                                </td>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{doctor.email}</span>
                                </td>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{doctor.phone}</span>
                                </td>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{doctor.address}</span>
                                </td>
                                <td>
                                    <span className="text-center ml-2 font-semibold">{doctor.city}</span>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <a href={`/doctors/${doctor.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                            Edit
                                        </a>
                                        <button onClick={() => handleDelete(doctor.id as string
                                        )} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <div className="text-center p-2">
                    <span className="text-gray-700">Page {pageNumber + 1} of {totalPages}</span>
                </div>
                <button
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={totalPages === 0 || pageNumber === 0}
                    className={"text-white font-bold py-2 px-4 rounded" + (pageNumber === 0 ? " bg-gray-400" : " bg-blue-500 hover:bg-blue-700")}
                >
                    Previous
                </button>
                <button
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={totalPages === 0 || pageNumber === totalPages - 1}
                    className={"text-white font-bold py-2 px-4 rounded ml-1" + (pageNumber === totalPages - 1 ? " bg-gray-400" : " bg-blue-500 hover:bg-blue-700")}
                >
                    Next
                </button>
                <div className="text-center ml-1">
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="text-gray-700 font-bold rounded"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DoctorsPage;