export class RoomModel {
    private _code: string | null;
    private _name: string;
    private _createAt: Date;
    private _image: string | null;
    private _members: string[];

    constructor(code: string | null, name: string, createAt: Date, image: string | null, members: string[]) {
        this._code = code;
        this._name = name;
        this._createAt = createAt;
        this._image = image;
        this._members = members;
    }

    get code(): string | null {
        return this._code;
    }

    set code(value: string | null) {
        this._code = value;
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