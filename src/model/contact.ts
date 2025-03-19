export class Contact {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profile: string;

    constructor(firstName: string, lastName: string, email: string, bio: string, profile: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bio = bio;
        this.profile = profile;
    }
}