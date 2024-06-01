'use client';   
import React from "react";
import axiosInstance from "@/libs/axios";

import Customer from "@/types/Customer";


const CreateCustomerPage = () => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone || !address || !city) {
            alert("Please fill all the fields");
            return;
        }

        if (!/^[a-zA-Z\s]*$/.test(name)) {
            alert("Name should only contain alphabets and spaces");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email");
            return;
        }

        if (!/^[0-9]*$/.test(phone)) {
            alert("Please enter a valid phone number");
            return;
        }

        if (!/^[a-zA-Z0-9\s]*$/.test(address)) {
            alert("Address should only contain alphabets, numbers and spaces");
            return;
        }

        axiosInstance.post("/customers", {
            name,
            email,
            phone,
            address,
            city
        })
        .then((response) => {
            const id = response.data.id;
            window.location.href = "/customers/" + id;
        })
        .catch((error) => {
            alert("An error occurred. Please try again later.");
            console.log(error);
        });
    };

    return (
        <div className="container mx-auto h-full flex flex-col">
            <div className="text-3xl font-semibold text-center">
                <h1>Create Customer</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input border-gray-300 bg-gray-100"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input border-gray-300 bg-gray-100"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input border-gray-300 bg-gray-100"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input border-gray-300 bg-gray-100"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input border-gray-300 bg-gray-100"
                    />
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCustomerPage;