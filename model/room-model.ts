import mongoose from "mongoose";

export class RoomModel {
    private _roomCode: string | null;
    private _name: string;
    private _createAt: Date;
    private _members: mongoose.Types.ObjectId[];

    constructor(roomCode: string | null, name: string, createAt: Date, members: mongoose.Types.ObjectId[]) {
        this._roomCode = roomCode;
        this._name = name;
        this._createAt = createAt;
        this._members = members;
    }

    get roomCode(): string {
        return this._roomCode;
    }

    set roomCode(value: string | null) {
        this._roomCode = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get createAt(): Date {
        return this._createAt;
    }

    set createAt(value: Date) {
        this._createAt = value;
    }

    get members(): mongoose.Types.ObjectId[] {
        return this._members;
    }

    set members(value: mongoose.Types.ObjectId[]) {
        this._members = value;
    }
}