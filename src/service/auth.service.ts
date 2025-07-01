import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/firebase"

class AuthService {
    async signUp(email: string, password: string) { 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        }
        catch {
            console.log("error")
        }
    }
}

export default new AuthService();