
'use client';
import React, { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import Report from "@/types/Report";

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        axiosInstance.get("/reports")
            .then((response) => {
                setReports(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }, []);

    function deleteReport(id: string) {
        axiosInstance.delete(`/reports/${id}`)
            .then(() => {
                setReports(reports.filter((report) => report.id !== id));
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }


    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Reports</h1>
            </div>
            <div className="flex justify-end">
                <a href="/reports/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Report
                </a>
            </div>
            <div className="flex flex-col mt-4">
                <table className="min-w-full table-auto">
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Title</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Diagnostic</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Price</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {reports.map((report) => (
                            <tr key={report.id} className="border-b border-gray-200">
                                <td className="px-16 py-2">
                                    {report.title}
                                </td>
                                <td className="px-16 py-2">
                                    {report.diagnosis}
                                </td>
                                <td className="px-16 py-2 gap-2">
                                    {report.price} €
                                </td>
                                <td className="px-16 py-2 gap-2">
                                    <a href={`/reports/${report.id}`} className="btn btn-primary">View</a>
                                    <button onClick={() => deleteReport(report.id as string)} className="btn bg-secondary ml-2">Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

