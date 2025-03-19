export class Room {
    name: string;
    createAt: Date;
    members: [];

    constructor(name: string, createAt: Date, members: []) {
        this.name = name;
        this.createAt = createAt;
        this.members = members;
    }
}