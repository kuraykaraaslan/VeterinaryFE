'use client';   
import React from "react";
import axiosInstance from "@/libs/axios";

import Customer from "@/types/Customer";
import Animal from "@/types/Animal";

const EditCustomerPage = ({ params } : { params: { customerID: string } }) => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");

    React.useEffect(() => {
        console.log(params.customerID);
        axiosInstance.get(`/customers/${params.customerID}`)
        .then((customer) => {
            console.log(customer);
            setName(customer.data.name);
            setEmail(customer.data.email);
            setPhone(customer.data.phone);
            setAddress(customer.data.address);
            setCity(customer.data.city);
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    }, [params.customerID]);

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

        axiosInstance.put(`/customers/${params.customerID}`, {
            name,
            email,
            phone,
            address,
            city
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurred. Please try again later.");
        });
    };


    return (
        <div className="container mx-auto h-full flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );

}


export default EditCustomerPage;


