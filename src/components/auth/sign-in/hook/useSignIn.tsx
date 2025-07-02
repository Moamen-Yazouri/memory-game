import { useFormik } from "formik";
import { IFormValues } from "../types"
import { INITIAL_VALUES } from "../constatns";
import { validationSchema } from "../validationSchema";
import authService from "@/service/auth.service";
import { toast } from "sonner";


export const useSignIn = () => {
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

