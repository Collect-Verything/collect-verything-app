export interface User {
    id?: number;

    firstname: string;

    lastname: string;

    email: string;

    password: string;

    birthDate: Date;

    gender: string;

    phone: string;

    roles: number[];
}
