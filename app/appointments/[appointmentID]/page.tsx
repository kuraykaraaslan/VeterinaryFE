'use client'
import React from "react";
import axiosInstance from "@/libs/axios";
import Appointment from "@/types/Appointment";
import Animal from "@/types/Animal";
import Doctor from "@/types/Doctor";
import WorkDay from "@/types/WorkDay";
const EditAppointmentPage = ({ params }: { params: { appointmentID: string } }) => {

    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

    const [animal, setAnimal] = React.useState<any>();
    const [animalId, setAnimalId] = React.useState<string>("0");
    const [doctor, setDoctor] = React.useState<any>();
    const [doctorId, setDoctorId] = React.useState<string>("0");

    const [animals, setAnimals] = React.useState<Animal[]>([]);
    const [doctors, setDoctors] = React.useState<Doctor[]>([]);
    const [availableDates, setAvailableDates] = React.useState<WorkDay[]>([]);

    const [availableDoctors, setAvailableDoctors] = React.useState<Doctor[]>([]);


    React.useEffect(() => {


        if (animals.length !== 0) {
            return;
        }

        axiosInstance.get("/animals")
            .then((response) => {
                setAnimals(response.data.content);
                console.log(response.data.content);
                setAnimalId(response.data.content[0].id as string);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

    }, []);

    React.useEffect(() => {

        if (doctors.length !== 0) {
            return;
        }

        axiosInstance.get("/doctors?page=0&size=5000")
            .then((response) => {
                console.log(response.data.content);
                setDoctors(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

    }, []);

    React.useEffect(() => {

        if (availableDates.length !== 0) {
            return;
        }

        axiosInstance.get("/available-dates?page=0&size=5000")
            .then((response) => {
                console.log(response.data.content);
                setAvailableDates(response.data.content);
                //flush available doctors
                setAvailableDoctors([]);
                //filter available doctors
                availableDates.forEach((availableDate) => {
                    if (availableDate.workDay === date) {
                        const doctor = doctors.find((doctor) => doctor.id === availableDate.doctor.id)
                        if (doctor) {
                            setAvailableDoctors((availableDoctors) => [...availableDoctors, doctor]);
                        }
                    }
                });

                //set first doctor as default
                if (availableDoctors.length > 0) {
                    setDoctorId(availableDoctors[0].id as string);
                }
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

    }, []);


    React.useEffect(() => {

        axiosInstance.get(`/appointments/${params.appointmentID}`)
            .then((response) => {
                const appointment = response.data;
                console.log(appointment);
                setDate(appointment.appointmentDate.split("T")[0]);
                setTime(appointment.appointmentDate.split("T")[1]);
                //add doctor to available doctors
                setAvailableDoctors((availableDoctors) => [...availableDoctors, appointment.doctor]);
                setAnimal(appointment.animal);
                setDoctorId(appointment.doctor.id);
                setAnimalId(appointment.animal.id);
                
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

    }, []);



    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        //set date
        setDate(e.target.value);

        //flush available doctors
        setAvailableDoctors([]);

        //flush doctor
        setDoctorId("");

        //filter available doctors
        availableDates.forEach((availableDate) => {
            if (availableDate.workDay === e.target.value) {
                const doctor = doctors.find((doctor) => doctor.id === availableDate.doctor.id)
                if (doctor) {
                    setAvailableDoctors((availableDoctors) => [...availableDoctors, doctor]);
                }
            }
        });
    }

    const animalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnimalId(e.target.value);
        const animal = animals.find((animal) => animal.id === e.target.value);
        setAnimal(animal);
    }

    const doctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDoctorId(e.target.value);
        const doctor = doctors.find((doctor) => doctor.id === e.target.value);
        setDoctor(doctor);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!date) {
            alert("Please select a date.");
            return;
        }

        if (!time) {
            alert("Please select a time.");
            return;
        }

        //find the animal object by id
        var animal = animals.find((animal) => animal.id === animalId);
        var doctor = doctors.find((doctor) => doctor.id === doctorId);

        if (!animal) {
            animal = animals[0];
        }

        if (!doctor) {
            doctor = doctors[0];
        }


        //appointmentDate": "2024-06-07T19:51:05.264Z",
        const appointmentDate = date + "T" + time;

        const appointment: Appointment = {
            appointmentDate,
            animal,
            doctor
        };

        console.log(appointment);

        //check if selected doctor is available on the selected date
        const selectedDate = new Date(date);
        const selectedDay = selectedDate.getDay();

        if (availableDates.length === 0) {
            alert("No available dates found");
            return;
        }

        const availableDate = availableDates.find((availableDate) => availableDate.workDay === date);
        if (!availableDate) {
            alert("No available dates found");
            return;
        }


        axiosInstance.put(`/appointments/${params.appointmentID}`, appointment)
            .then(() => {
                alert("Appointment updated successfully.");
                window.location.href = "/appointments";
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });

    };

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Create Appointment</h1>
            </div>
            <div className="flex justify-center mt-4">
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                                Date
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="date"
                                type="date"
                                value={date}
                                onChange={dateChange}

                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="time">
                                Time
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="time"
                                type="time"
                                value={time}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="animalId">
                                Animal
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="animalIdSelect"
                                value={animalId}
                            >
                                {animals.map((animal: any) => (
                                    <option key={animal.id} value={animal.id}>{animal.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doctorId">
                                Doctor
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="doctorIdSelect"
                                value={doctorId}

                            >
                                <option value="0" disabled>Select a doctor</option>
                                {availableDoctors.map((doctor: any) => (
                                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    );
}

export default EditAppointmentPage;