import mongoose from "mongoose";

export class ContactModel {
    private _code: string | null;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _rooms: string[];
    private _users: string[];

    constructor(code: string | null, firstName: string, lastName: string, email: string, rooms: string[], users: string[]) {
        this._code = code;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._rooms = rooms;
        this._users = users;
    }

    get code(): string | null{
        return this._code;
    }

    set code(value: string | null) {
        this._code = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get rooms(): string[] {
        return this._rooms;
    }

    set rooms(value: string[]) {
        this._rooms = value;
    }

    get users(): string[] {
        return this._users;
    }

    set users(value: string[]) {
        this._users = value;
    }
}