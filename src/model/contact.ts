export class Contact {
    public code: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public bio: string;
    public image:File | null | undefined;
    public rooms: string[];
    public users: any;

    constructor(code: string, firstName: string, lastName: string, email: string, bio: string, image: File | null | undefined, rooms: string[], users: any) {
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bio = bio;
        this.image = image;
        this.rooms = rooms;
        this.users = users;
    }
}