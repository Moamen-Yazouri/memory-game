import { useFormik } from "formik";
import { IFormValues } from "../types"
import { INITIAL_VALUES } from "../constatns";
import { validationSchema } from "../validationSchema";

export const useSignIn = () => {
    const handleSubmit = (
        values: IFormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(false);
        resetForm();
        console.log(values);
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

