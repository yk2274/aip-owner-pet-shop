export interface Owner {
    id: number,
    firstName: string,
    lastName: string,
    dateCreated: string,
    dateModified: string
}

export interface OwnerRequest {
    firstName: string,
    lastName: string
}