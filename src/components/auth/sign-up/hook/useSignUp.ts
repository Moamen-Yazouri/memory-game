import { useFormik } from "formik";
import { IFormValues } from "./types"
import { signUpSchema } from "../validationSchema";
import { INITIAL_VALUES } from "../constants";
import authService from "@/service/auth.service";

export const useSignUp = () => {
    const handleSignUp = (
         values: IFormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        authService.signUp(values.email, values.password)
        .then((data) => {
            console.log(data?.email);
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