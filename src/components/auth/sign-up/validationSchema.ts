import * as yup from "yup";

export const signUpSchema = yup.object({
    fullName: yup.string().required("The name is required!"),
    email: yup.string().email("Invalid email").required("The email is required!"),
    password: yup.string().required("The password is Required!"),
})