import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Paper,
  useTheme
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const handleTogglePassword = () => setShowPassword(prev => !prev);
  
  const gradient = theme.palette.mode === "light" 
    ? "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #ddd6fe 100%)"
    : "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form logic here
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          backgroundImage: gradient,
          backdropFilter: "blur(10px)",
          border: theme.palette.mode === "light" 
            ? "1px solid rgba(139, 92, 246, 0.2)"
            : "1px solid rgba(139, 92, 246, 0.3)",
          boxShadow: theme.palette.mode === "light"
            ? "0 8px 32px rgba(139, 92, 246, 0.15)"
            : "0 8px 32px rgba(0, 0, 0, 0.4)"
        }}
      >
        <Typography variant="h5" align="center" gutterBottom color="text.primary">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.mode === "light" 
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(255, 255, 255, 0.05)",
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.light,
                }
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.mode === "light" 
                  ? "rgba(255, 255, 255, 0.8)"
                  : "rgba(255, 255, 255, 0.05)",
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.light,
                }
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}