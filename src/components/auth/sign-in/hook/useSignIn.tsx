import { useFormik } from "formik";
import { IFormValues } from "../types"
import { INITIAL_VALUES } from "../constatns";
import { validationSchema } from "../validationSchema";
import authService from "@/service/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export const useSignIn = () => {
    const nav = useNavigate();
    const handleSubmit = (
        values: IFormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const sign = authService.signIn(values.email, values.password);
        sign.then(
            (data) => {
                setSubmitting(false);
                resetForm();
                if(typeof data === "string") {
                    toast.error(data);
                }
                else {
                    toast.success(`Signed-in successfully with email: ${data.email}`);
                    nav("mode-selection");
                }
            }
        )
    }

    const formik = useFormik<IFormValues>({
        initialValues: INITIAL_VALUES,
        validationSchema: validationSchema,
        onSubmit: ((values, { resetForm, setSubmitting }) => {
            handleSubmit(values, resetForm, setSubmitting);
        })
    });

    return formik;
}

