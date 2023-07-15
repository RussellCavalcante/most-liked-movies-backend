import { User } from "src/Mongo/Interfaces/user.interface";

export class LoginPayload{
    id: number;
    typeUser: number;
    name: string;

    constructor(user: User){
        this.id = user.id
        this.typeUser = user.typeUser;
        this.name = user.name
    }
}