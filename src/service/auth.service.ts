import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile, 
    User
} from "firebase/auth";
import {auth} from "../firebase/firebase";
import { FirebaseError } from "firebase/app";

class AuthService {
    private provider = new GoogleAuthProvider();
    async signUp(email: string, password: string, name: string) { 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
            });
            return userCredential.user;
        }
        catch (error: unknown){
            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    return "The email is already used!";
                }
                else {
                    return "Failed to sign-up, please retry later!";    
                }
            }
            else {
                return "Failed to sign-up, please retry later!";
            }     
        }
    }

    async signUpWithGoogle () {

        try {
            const result = await signInWithPopup(auth, this.provider);
            const user = result.user;

            return user;

            
        } catch {
            return "Failed to sign-up with google, try again later!"
        }

    }

    async signInWithGoogle () {
        try {

            const result = await signInWithPopup(auth, this.provider);
            return result.user;

        } catch (error) {

            console.error("Google sign-in error:", error);
            return "Failed to sign-up with google, try again later!";
        }

    }

    async signIn (email: string, password: string) {
        try {
            const userCredintials = await signInWithEmailAndPassword(auth, email, password);
            return userCredintials.user;
        }
        catch (error: unknown){
            if(error instanceof FirebaseError || error instanceof Error) {
                return "Invalid Credentials";
            }
            else {
                return "Something went wrong!";
            }
        }

    }

    async logout() {
        try {
            await signOut(auth);
            return true;
        }
        catch {
            return false;
        }
        
    }

    async getLoggedUser(): Promise<User | null> {
        await auth.authStateReady();
        const user = auth.currentUser;
        if(user) {
            return user; 
        }
        return null;
    }
}

export default new AuthService();