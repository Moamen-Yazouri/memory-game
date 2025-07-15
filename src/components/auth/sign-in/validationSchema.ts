import * as yup from "yup";

export const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("The email is required!"),
    password: yup.string().required("The password is Required!"),
}) 
