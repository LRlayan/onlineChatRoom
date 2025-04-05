import {saveUserRepository, verifyUserCredentials} from "../repository/user-repository";
import {UserModel} from "../model/user-model";

export async function saveUserService(user: UserModel) {
    try {
        const users = new UserModel(user.username, user.email, user.password, user.contacts, user.rooms);
        return await saveUserRepository(users);
    } catch (e) {
        console.log(" service : ", e);
    }
}

export async function verifyUserCredentialsService(username: string, password: string) {
    try {
        if (!username && !password) {
            console.error(`Please required username: ${username} and password: ${password}`)
        }
        return verifyUserCredentials(username, password);
    } catch (e) {
        throw e;
    }
}