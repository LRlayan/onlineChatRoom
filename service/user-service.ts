import {verifyUserCredentials} from "../repository/user-repository";

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