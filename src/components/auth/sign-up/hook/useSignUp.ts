import { useFormik } from "formik";
import { IFormValues } from "./types"
import { signUpSchema } from "../validationSchema";
import { INITIAL_VALUES } from "../constants";
import authService from "@/service/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/@types";
import { AuthContext } from "@/providers/auth/authContext";
import { useContext } from "react";

export const useSignUp = () => {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    
    const handleSignUp = (
         values: IFormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {

        authService.signUp(values.email, values.password, values.fullName)
        .then((data) => {
            if(typeof data === "string") {
                toast.error(data)
            }
            else {
                toast.success(`Successfully signed-up with email: ${data.email}`);
                const user: IUser = {
                    name: data.displayName!,
                    email: data.email!,
                    id: data.uid,
                }
                login(user);
                navigate("/memory-game/mode-selection");
            }
            setSubmitting(false);
            resetForm();
        })
        resetForm();
    }

    const formik = useFormik<IFormValues>({
        initialValues: INITIAL_VALUES,
        validationSchema: signUpSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            handleSignUp(values, resetForm, setSubmitting);
        },
    })

    return {
        formik,
    }
}