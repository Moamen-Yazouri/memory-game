import { FormikProvider, Form } from "formik";
import { useSignIn } from "./hook/useSignIn";
import Button from "@mui/material/Button";
import CustomField from "@/components/custom/field.custom/customField";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import SmallLoader from "@/components/main-header/components/smallLoader";
// ✅ import your loader

const SignInForm = () => {
  const formik = useSignIn();
  const theme = useTheme();

  const inputStyle = useMemo(() => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(255, 255, 255, 0.05)",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.light,
    },
  }), [theme]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <CustomField
          name="email"
          type="email"
          label="Email Address"
          isPassword={false}
          sx={inputStyle}
          disabled={formik.isSubmitting}
        />

        <CustomField
          name="password"
          type="password"
          isPassword={true}
          label="Password"
          sx={inputStyle}
          disabled={formik.isSubmitting}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: 600,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 16px rgba(139, 92, 246, 0.3)"
                : "0 4px 16px rgba(139, 92, 246, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}

        >
          {formik.isSubmitting ? <SmallLoader isSignIn={true} /> : "Sign In"}
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
