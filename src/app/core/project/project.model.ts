import { Object } from "./object.model";

export interface Project {
    name: string;
    location: string;
    saveDate: Date;
    object: Object
}