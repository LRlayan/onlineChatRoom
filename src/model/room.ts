import {Contact} from "./contact.ts";

export class Room {
    public name: string;
    public createAt: number | undefined;
    public image: File | string | null;
    public members: Contact[];

    constructor(name: string, createAt: number | undefined, image: File | string | null, members: Contact[]) {
        this.name = name;
        this.createAt = createAt;
        this.image = image;
        this.members = members;
    }
}