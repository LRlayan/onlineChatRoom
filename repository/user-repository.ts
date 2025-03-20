import bcrypt from "bcrypt";
import User from "../schema/user";

export async function saveUserRepository(user: { username: string; email: string; password: string }) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User({
            username: user.username,
            email: user.email,
            password: hashedPassword
        });

        await newUser.save();
        return newUser;
    } catch (e) {
        console.error("Error saving user:", e);
    }
}

export async function verifyUserCredentials( username: string, password: string ) {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return false;
        }

        if (!user.password) {
            throw new Error("User password not found.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch, " match ")
        return passwordMatch;
    } catch (error) {
        console.error("Error verifying user credentials:", error);
        throw error;
    }
}