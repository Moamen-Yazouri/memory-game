import CustomField from "@/components/custom/field.custom/customField"
import Button from "@mui/material/Button"
import { Form, FormikProvider } from "formik"
import { useSignUp } from "./hook/useSignUp";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { Google } from "@mui/icons-material";
import authService from "@/service/auth.service";
import SmallLoader from "@/components/main-header/components/smallLoader";


const SignUpForm = () => {
    const theme = useTheme();
    const {formik} = useSignUp();
    const inputStyles = useMemo(() => (
        {
            backgroundColor: theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(255, 255, 255, 0.05)",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
            borderWidth: "2px",
        },
        }
    ), [theme]);

    const handleGoogleSignUp = () => {
        authService.signUpWithGoogle();
    }
        
  
  return (
    <FormikProvider
        value={formik}
    >
                
        <Form> 
            <CustomField
                name="fullName"
                label="Full Name"
                type="text"
                isPassword={false}
                sx={inputStyles}
                disabled={formik.isSubmitting}
            />

                <CustomField
                name="email"
                label="Email Address"
                type="email"
                isPassword={false}
                sx={inputStyles}
                disabled={formik.isSubmitting}
                />

            <CustomField
                name="password"
                label="Password"
                type="password"
                isPassword={true}
                sx={inputStyles}
                disabled={formik.isSubmitting}
                />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 600,
                boxShadow: theme.palette.mode === "light"
                    ? "0 4px 16px rgba(139, 92, 246, 0.3)"
                    : "0 4px 16px rgba(139, 92, 246, 0.4)"
                }}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? <SmallLoader isSignIn={true}/> : "Sign Up"}
            </Button>

            <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<Google />}
                onClick={handleGoogleSignUp}
                sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 600,
                backgroundColor: theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.06)",
                "&:hover": {
                    backgroundColor: theme.palette.mode === "light"
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.1)"
                }
                }}
            >
                Sign Up with Google
            </Button>
        </Form>
    </FormikProvider>
  )
}

export default SignUpForm