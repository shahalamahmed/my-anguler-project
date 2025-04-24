import { location } from "../location/location.model";

export class StudentModel {
    id!: number;
    name!: string;
    email!: string;
    cellNo!: string;
    location!:{
    id: string;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
};
}


