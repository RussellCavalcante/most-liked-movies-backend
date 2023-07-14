import { User } from "src/Mongo/Interfaces/user.interface";

export class LoginPayload{
    id: number;
    typeUser: number;

    constructor(user: User){
        this.id = user.id
        this.typeUser = user.typeUser;
    }
}