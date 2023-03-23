import { Owner } from "./owner";

export interface Pet {
    id: number,
    name: string,
    breed: string,
    owner: Owner,
    dateCreated: string,
    dateModified: string
}