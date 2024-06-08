'use client';
import React, { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";

import Animal from "@/types/Animal";

const AnimalsPage = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        axiosInstance.get("/animals" + `?page=${pageNumber}&size=${pageSize}`)
            .then((response) => {
                setAnimals(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }, []);

    function handleDelete(id: string) {
        confirm("Are you sure you want to delete this animal?") &&
            axiosInstance.delete(`/animals/${id}`)
                .then(() => {
                    setAnimals(animals.filter((animal) => animal.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred. Please try again later.");
                });
    };

    function goToCustomer(animal: Animal) {
        const id = animal.customer ? animal.customer.id : "";
        window.location.href = `/customers/${id}`;
    }

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Animals</h1>
            </div>
            <div className="flex justify-end">
                <a href="/animals/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Animal
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
                                <span className="text-gray-300">Species</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Owner</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {animals.map((animal) => (
                            <tr key={animal.id} className="bg-white border-4 border-gray-200">
                                <td className="px-16 py-2">
                                    {animal.name}
                                </td>
                                <td className="px-16 py-2">
                                    {animal.species}
                                </td>
                                <td className="px-16 py-2">
                                    {animal.customer ? (
                                        <a href="#" onClick={() => goToCustomer(animal)} className="text-blue-500 hover:text-blue-800">
                                            {animal.customer.name}
                                        </a>
                                    ) : (
                                        "Loading..."
                                    )}
                                </td>
                                <td className="px-16 py-2">
                                    <a href={`/animals/${animal.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </a>
                                    <button onClick={() => handleDelete(animal.id as string

                                    )} className="bg-red-500 hover:bg-red-700 text-white font-bold ml-2 py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        </div>
    );
}

export default AnimalsPage;