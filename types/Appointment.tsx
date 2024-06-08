import Doctor from "./Doctor";
import Animal from "./Animal";

export default interface Appointment {
    id?: string;
    appointmentDate: string;
    animal: Animal;
    doctor: Doctor;
}

