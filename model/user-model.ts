export class UserModel {
    private _username: string;
    private _email: string;
    private _password: string;
    private _contacts: string[];
    private _rooms: string[];

    constructor(username: string, email: string, password: string, contacts: string[], rooms: string[]) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._contacts = contacts;
        this._rooms = rooms;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get contacts(): string[] {
        return this._contacts;
    }

    set contacts(value: string[]) {
        this._contacts = value;
    }

    get rooms(): string[] {
        return this._rooms;
    }

    set rooms(value: string[]) {
        this._rooms = value;
    }
}