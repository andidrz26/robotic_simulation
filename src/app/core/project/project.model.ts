import { ProjectDate } from "./date.model";
import { Object } from "./object.model";

export interface Project {
    name: string;
    location: string;
    savedate: ProjectDate;
    object: Object
}