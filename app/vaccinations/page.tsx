'use client';
import React , {useState} from "react";
import axiosInstance from "@/libs/axios";
import Vaccine from "@/types/Vaccine";
import Animal from "@/types/Animal";

const VaccinationsPage = () => {
    const [vaccines, setVaccines] = React.useState<Vaccine[]>([]);
    
    const [pageNumber , setPageNumber] = useState(0);
    const [totalPages , setTotalPages] = useState(0);
    const [totalElements , setTotalElements] = useState(0);
    const [pageSize , setPageSize] = useState(5);



    React.useEffect(() => {
        axiosInstance.get("/vaccinations" + `?page=${pageNumber}&size=${pageSize}`)
        .then((vaccines) => {
            setVaccines(vaccines.data.content);
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });

    }, []);

    
    function deleteVaccine(vaccineID: string) {
        axiosInstance.delete(`/vaccinations/${vaccineID}`)
        .then(() => {
            setVaccines(vaccines.filter((vaccine) => vaccine.id !== vaccineID));
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }


    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Vaccines</h1>
            </div>
            <div className="flex justify-end">
                <a href="/vaccinations/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Vaccine
                </a>
            </div>
            <div className="flex flex-col mt-4">
                <table className="min-w-full table-auto">
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Name/Code</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Animal</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Protection Start Date</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Protection End Date</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vaccines.map((vaccine) => (
                            <tr key={vaccine.id} className="border-b border-gray-200 bg-gray-100">
                                <td className="px-16 py-2">
                                    {vaccine.name}
                                </td>
                                <td className="px-16 py-2">
                                    {vaccine.animalWithoutCustomer ? vaccine.animalWithoutCustomer.name : ""}
                                </td>
                                <td className="px-16 py-2">
                                    {vaccine.protectionStartDate}
                                </td>
                                <td className="px-16 py-2">
                                    {vaccine.protectionFinishDate}
                                </td>
                                <td className="px-16 py-2">
                                    <a href={`/vaccinations/${vaccine.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </a>
                                    <button onClick={() => deleteVaccine(vaccine.id as string)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

export default VaccinationsPage;