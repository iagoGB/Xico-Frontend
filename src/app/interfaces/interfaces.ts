export interface User {
    id: number,
    name: string,
    lastName: string,
    nickname: string,
    image: string,
    email: string,
    password: string,
    description: string,
    entryDate: string,
    tools: Array<any>,
    projects: Array<string>
}