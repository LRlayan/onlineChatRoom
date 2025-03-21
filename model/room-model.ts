export class RoomModel {
    private _roomCode: string | null;
    private _name: string;
    private _createAt: Date;
    private _image: string | null;
    private _members: string[];

    constructor(roomCode: string | null, name: string, createAt: Date, image: string | null, members: string[]) {
        this._roomCode = roomCode;
        this._name = name;
        this._createAt = createAt;
        this._image = image;
        this._members = members;
    }

    get roomCode(): string | null {
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

    get image(): string | null {
        return this._image;
    }

    set image(value: string | null) {
        this._image = value;
    }

    get members(): string[] {
        return this._members;
    }

    set members(value: string[]) {
        this._members = value;
    }
}