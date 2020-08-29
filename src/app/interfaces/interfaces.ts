export interface User {
    id: number,
    name: string,
    lastName: string,
    image: string,
    email: string,
    password: string,
    description: string,
    entryDate: string,
    tools: Array<string>,
    projects: Array<string>
}