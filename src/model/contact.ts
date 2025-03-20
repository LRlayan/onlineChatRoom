export class Contact {
    public firstName: string;
    public lastName: string;
    public email: string;
    public bio: string;
    public profile: string;

    constructor(firstName: string, lastName: string, email: string, bio: string, profile: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bio = bio;
        this.profile = profile;
    }
}