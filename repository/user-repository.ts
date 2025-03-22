import bcrypt from "bcrypt";
import User, {IUser} from "../schema/user";
import mongoose from "mongoose";

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

export async function getSelectedUsers(_ids: mongoose.Types.ObjectId[]) {
    try {
        return await User.find({ _id: { $in: _ids }});
    } catch (e) {
        console.error("Error fetching selected users:", e);
        throw new Error("Failed to fetch selected users. Please try again.");
    }
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).populate("contacts").populate("rooms").exec();
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