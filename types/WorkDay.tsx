/*
{
  "id": 0,
  "workDay": "2024-06-01",
  "doctor": {
    "id": 0,
    "name": "string",
    "phone": "string",
    "email": "string",
    "address": "string",
    "city": "string"
  }
}

*/

import Doctor from "./Doctor";

interface WorkDay {
    id : string;
    workDay: string;
    doctor: Doctor;
}

export default WorkDay;