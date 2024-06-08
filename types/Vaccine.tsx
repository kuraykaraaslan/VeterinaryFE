/*
{
  "name": "string",
  "code": "string",
  "protectionStartDate": "2024-06-08",
  "protectionFinishDate": "2024-06-08",
  "animalWithoutCustomer": {
    "id": 0,
    "name": "string",
    "species": "string",
    "breed": "string",
    "gender": "string",
    "dateOfBirth": "2024-06-08",
    "colour": "string"
  }
}
*/
import Animal from "./Animal";

interface Vaccine {
    id?: string;
    name: string;
    code: string;
    protectionStartDate: string;
    protectionFinishDate: string;
    animalWithoutCustomer?: Animal;
}

export default Vaccine;