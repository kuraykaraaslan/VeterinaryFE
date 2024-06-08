'use client';   
import React from "react";
import axiosInstance from "@/libs/axios";

import Animal from "@/types/Animal";
import Vaccine from "@/types/Vaccine";

/*
interface Vaccine {
    id?: string;
    name: string;
    code: string;
    protectionStartDate: string;
    protectionFinishDate: string;
    animalWithoutCustomer?: Animal;
}
*/

const EditVaccinationPage = ({ params } : { params: { vaccinationID: string } }) => {

    const [name, setName] = React.useState("");
    const [code, setCode] = React.useState("");
    const [protectionStartDate, setProtectionStartDate] = React.useState("");
    const [protectionFinishDate, setProtectionFinishDate] = React.useState("");
    const [animalId, setAnimalId] = React.useState("");
    const [animals, setAnimals] = React.useState<Animal[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !code || !protectionStartDate || !protectionFinishDate || !animalId) {
            alert("Please fill all the fields");
            return;
        }

        const vaccine = {
            name,
            code,
            protectionStartDate,
            protectionFinishDate,
            animalWithoutCustomer: animals.find((animal) => animal.id === animalId)
        };

        console.log(vaccine);

        axiosInstance.put("/vaccinations/" + params.vaccinationID, vaccine)
        .then((response) => {
            const id = response.data.id;
            window.location.href = "/vaccinations/" + id;
        })
        .catch((error) => {
            alert("An error occurred. Please try again later.");
            console.log(error);
        });

    }

    React.useEffect(() => {
        axiosInstance.get("/animals")
            .then((response) => {
                setAnimals(response.data.content);
                setAnimalId(response.data.content[0].id);
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }, []);


    React.useEffect(() => {
        axiosInstance.get("/vaccinations/" + params.vaccinationID)
            .then((response) => {
                const vaccine = response.data as Vaccine;
                setName(vaccine.name);
                setCode(vaccine.code);
                setProtectionStartDate(vaccine.protectionStartDate);
                setProtectionFinishDate(vaccine.protectionFinishDate);
                setAnimalId(vaccine.animalWithoutCustomer?.id || "");
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }
    , [params.vaccinationID]);

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Create Vaccination</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 p-2"
                    />
                    <input
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="border border-gray-300 p-2"
                    />
                    <input
                        type="date"
                        placeholder="Protection Start Date"
                        value={protectionStartDate}
                        onChange={(e) => setProtectionStartDate(e.target.value)}
                        className="border border-gray-300 p-2"
                    />
                    <input
                        type="date"
                        placeholder="Protection Finish Date"
                        value={protectionFinishDate}
                        onChange={(e) => setProtectionFinishDate(e.target.value)}
                        className="border border-gray-300 p-2"
                    />
                    <select
                        value={animalId}
                        onChange={(e) => setAnimalId(e.target.value)}
                        className="border border-gray-300 p-2"
                    >
                        <option value="">Select Animal</option>
                        {animals.map((animal) => (
                            <option key={animal.id} value={animal.id}>{animal.name}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );

}

export default EditVaccinationPage;