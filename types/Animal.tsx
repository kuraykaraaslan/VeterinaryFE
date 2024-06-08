import Customer from "./Customer";

interface Animal {
    id?: string;
    name: string;
    species: string;
    breed: string;
    gender: string;
    age: number;
    dateOfBith: Date;
    color: string;
    customerId?: number;
    customer?: Customer;
}


export default Animal;