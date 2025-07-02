import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import {auth} from "../firebase/firebase";
import { FirebaseError } from "firebase/app";

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

            return user.email;

            
        } catch {
            return "Failed to sign-up with google, try again later!"
        }

    }

    async signIn (email: string, password: string) {
        try {
            const userCredintials = await signInWithEmailAndPassword(auth, email, password);
            return userCredintials.user;
        }
        catch (error: unknown){
            if(error instanceof FirebaseError) {
                if(
                    error.code === "auth/wrong-password" || 
                    error.code === "auth/user-not-found"

                ) {
                    return "Invalid credintials";
                }
                else {
                    return "Something went wrong!";    
                }
            }
            else {
                return "Something went wrong!";
            }
        }

    }
}

export default new AuthService();