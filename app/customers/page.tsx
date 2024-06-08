'use client';
import React, { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";

import Customer from "../../types/Customer";


const CustomersPage = () => {

    const [customers, setCustomers] = useState<Customer[]>([]);

    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        axiosInstance.get(`/customers?page=${pageNumber}&size=${pageSize}`)
            .then((response) => {
                console.log(response.data);
                setCustomers(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pageNumber, pageSize]);

    function handleDelete(id: string) {
        // confirm dialog
        confirm("Are you sure you want to delete this customer?") &&
            axiosInstance.delete(`/customers/${id}`)
                .then(() => {
                    setCustomers(customers.filter((customer) => customer.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Customers</h1>
            </div>
            <div className="flex justify-end">
                <a href="/customers/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Customer
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
                        {customers.map((customer) => (
                            <tr className="bg-white border-4 border-gray-200" key={customer.id}>
                                <td className="px-16 py-2">
                                    {customer.name}
                                </td>
                                <td className="px-16 py-2">
                                    {customer.email}
                                </td>
                                <td className="px-16 py-2">
                                    {customer.phone}
                                </td>
                                <td className="px-16 py-2">
                                    {customer.address}
                                </td>
                                <td className="px-16 py-2">
                                    {customer.city}
                                </td>
                                <td className="px-16 py-2 flex justify-center">
                                    <a href={`/customers/${customer.id}`}className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        View
                                    </a>
                                    <a href={`/customers/${customer.id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1">
                                        Edit
                                    </a>
                                    <button onClick={() => handleDelete(customer.id as string)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-1">
                                        Delete
                                    </button>
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
                    className={"text-white font-bold py-2 px-4 rounded ml-1" + (pageNumber === totalPages ? " bg-gray-400" : " bg-blue-500 hover:bg-blue-700")}
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

export default CustomersPage;