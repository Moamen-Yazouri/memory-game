import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from "firebase/auth";
import {auth} from "../firebase/firebase";

class AuthService {
    provider = new GoogleAuthProvider();
    async signUp(email: string, password: string, name: string) { 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
            });
            return userCredential.user;
        }
        catch {
            console.log("error")
        }
    }

    async signUpWithGoogle () {

        try {
            const result = await signInWithPopup(auth, this.provider);
            const user = result.user;

            return user.email;

            
        } catch {
            return "Failed to sign-up with google, try again later!"
        }

    }
}

export default new AuthService();