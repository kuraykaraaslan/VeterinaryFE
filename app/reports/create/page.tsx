'use client';
import React from "react";
import axiosInstance from "@/libs/axios";
import Animal from "@/types/Animal";
import Vaccine from "@/types/Vaccine";
import Report from "@/types/Report";

export default function CreateReportPage() {

    const [mode, setMode] = React.useState("create");

    const [title, setTitle] = React.useState("");
    const [diagnosis, setDiagnosis] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [appointmentId, setAppointmentId] = React.useState("");

    const [appointments, setReports] = React.useState<Report[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !diagnosis || !price || !appointmentId) {
            alert("Please fill all the fields");
            return;
        }

        const report = {
            title,
            diagnosis,
            price,
            appointmentId
        };

        console.log(report);

        axiosInstance.post("/reports", report)
        .then((response) => {
            const id = response.data.id;
            window.location.href = "/reports/" + id;
        })
        .catch((error) => {
            alert("An error occurred. Please try again later.");
            console.log(error);
        });

    }

    React.useEffect(() => {
        axiosInstance.get("/appointments")
            .then((response) => {
                setReports(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    } , []);


    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Create Report</h1>
            </div>
            <div className="flex justify-center mt-4">
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="title" className="text-lg font-semibold">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-box"
                        />
                        <label htmlFor="diagnosis" className="text-lg font-semibold">Diagnosis</label>
                        <input
                            id="diagnosis"
                            type="text"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            className="input-box"
                        />
                        <label htmlFor="price" className="text-lg font-semibold">Price</label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(+e.target.value)}
                            className="input-box"
                        />
                        <label htmlFor="appointmentId" className="text-lg font-semibold">Appointment</label>
                        <select
                            id="appointmentId"
                            value={appointmentId}
                            onChange={(e) => setAppointmentId(e.target.value)}
                            className="input-box"
                        >
                            <option value="" disabled>Select an appointment</option>
                            {appointments.map((appointment) => (
                                <option key={appointment.id} value={appointment.id}>{appointment.id}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

