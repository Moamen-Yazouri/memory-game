import { useFormik } from "formik";
import { IFormValues } from "./types"
import { signUpSchema } from "../validationSchema";
import { INITIAL_VALUES } from "../constants";
import authService from "@/service/auth.service";
import { toast } from "sonner";

export const useSignUp = () => {
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