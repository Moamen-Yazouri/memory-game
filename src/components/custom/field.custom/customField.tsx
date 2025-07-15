import { useField } from "formik";
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  SxProps,
  Theme
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";


type TextFieldProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name"
> & {
    name: string,
    label?: string,
    sx?: SxProps<Theme>, 
    isPassword: boolean,
}
const CustomField: React.FC<TextFieldProps> = ({
    name,
    label,
    isPassword,
    sx,
    ...rest
}) => {
    const [field, meta] = useField<string>(name);
    const [isShowen, setIsShowen] = useState(false)
  return (
    <FormControl fullWidth required margin="normal" variant="outlined">
        {
            label && (
                <InputLabel sx={{zIndex: 9999}} htmlFor={name}>{label}</InputLabel>
            )
        }
        {
            isPassword
            ? (
                <OutlinedInput
                    id= {name}
                    {...field}
                    type= {isPassword ? (isShowen ? "text" : "password") : rest.type}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={() => setIsShowen(!isShowen)} edge="end">
                                {isShowen ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                    sx={sx}
                />
            ) : (
                <OutlinedInput
                    id= {name}
                    {...field}
                    type= {isPassword ? (isShowen ? "text" : "password") : rest.type}
                    sx={sx}
                    label={label}
                />
            )             
        }

        {
            meta.touched && meta.error && (
                <p className="text-sm text-red-500 mt-1">{meta.error}</p>
            )
        }
    </FormControl>
  )
}

export default CustomField;