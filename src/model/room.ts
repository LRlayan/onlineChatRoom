import {Contact} from "./contact.ts";

export class Room {
    name: string;
    createAt: number | undefined;
    image: File | string | null;
    members: Contact[];

    constructor(name: string, createAt: number | undefined, image: File | string | null, members: Contact[]) {
        this.name = name;
        this.createAt = createAt;
        this.image = image;
        this.members = members;
    }
}