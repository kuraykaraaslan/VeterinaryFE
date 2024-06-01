'use client';   
import React from "react";
import axiosInstance from "@/libs/axios";

import Animal from "@/types/Animal";
import Customer from "@/types/Customer";


const EditAnimalPage = ({ params } : { params: { animalID: string } }) => {

    const [name, setName] = React.useState("");
    const [species, setSpecies] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [colour, setColour] = React.useState("");
    const [birthOfDate, setBirthOfDate] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [customerID, setCustomerID] = React.useState("");
    const [customer, setCustomer] = React.useState<Customer|null>(null);

    const [availableCustomers, setAvailableCustomers] = React.useState<Customer[]>([]);

    React.useEffect(() => {
        axiosInstance.get(`/animals/${params.animalID}`)
        .then((animal) => {
            console.log(animal);
            setName(animal.data.name);
            setSpecies(animal.data.species);
            setBreed(animal.data.breed);
            setColour(animal.data.colour);
            setBirthOfDate(animal.data.birthOfDate);
            setGender(animal.data.gender);
            setCustomer(animal.data.customer);
        }
        )
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }
    , [params.animalID]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !species || !breed || !colour || !birthOfDate || !gender || !customerID) {
            alert("Please fill all the fields");
            return;
        }


        if (!/^[a-zA-Z\s]*$/.test(name)) {
            alert("Name should only contain alphabets and spaces");
            return;
        }

        if (!/^[a-zA-Z\s]*$/.test(species)) {
            alert("Species should only contain alphabets and spaces");
            return;
        }

        if (!/^[a-zA-Z\s]*$/.test(breed)) {
            alert("Breed should only contain alphabets and spaces");
            return;
        }

        //YYYY-MM-DD
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthOfDate)) {
            alert("Please enter a valid date of birth");
            return;
        }

        if (!/^[a-zA-Z\s]*$/.test(colour)) {
            alert("Color should only contain alphabets and spaces");
            return;
        }


        if (!/^[0-9]*$/.test(customerID)) {
            alert("Please enter a valid owner");
            return;
        }

        setCustomer(null);

        axiosInstance.get(`/customers/${customerID}`)
        .then((customer) => {
            console.log(customer);
            setCustomer(customer.data);
        }).catch((error) => {
            console.log(error);
            setCustomer(null);
            alert("An error occurred. Please try again later.");
            return null;
        }
        );

        console.log(customer);

        if (customer == null) 
            {return;}

        const request =
        {
            name,
            species,
            breed,
            gender,
            birthOfDate,
            colour,
            customer
        }

        axiosInstance.put(`/animals/${params.animalID}`, request)
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }
    ;

    React.useEffect(() => {
        axiosInstance.get("/customers")
        .then((customers) => {
            setAvailableCustomers(customers.data.content);
        }
        )
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }

    , []);

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Create Animal</h1>
            </div>            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    />
                <input  
                    type="text"
                    placeholder="Species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    />
                <input
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    />
                <input
                    type="text"
                    placeholder="Color"
                    value={colour}
                    onChange={(e) => setColour(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    />
                <input
                    type="text"
                    placeholder="Birth of Date (YYYY-MM-DD)"
                    value={birthOfDate}
                    onChange={(e) => setBirthOfDate(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    />

                <input
                    type="text"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    />
                <select
                    value={customer?.id}
                    onChange={(e) => setCustomerID(e.target.value)}
                    className="input border-gray-300 bg-gray-100"
                    >
                    <option value="">Select Owner</option>
                    {availableCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>

                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default EditAnimalPage;