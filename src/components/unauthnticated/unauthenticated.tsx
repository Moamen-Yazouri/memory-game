"use client"

import { useMemo } from "react"
import { 
    Box, 
    Typography, 
    Container, 
    Paper, 
    Button, 
    useTheme, 
    Stack, 
    Divider, 
} from "@mui/material";
import { 
    Login, 
    PersonAdd, 
    LockOutlined, 
    Google,  
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function Unauthenticated() {
  const theme = useTheme()
    const navigate = useNavigate();
  const gradient = useMemo(
    () =>
      theme.palette.mode === "light"
        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.8) 100%)"
        : "linear-gradient(135deg, rgba(45, 27, 78, 0.9) 0%, rgba(26, 15, 46, 0.8) 50%, rgba(15, 5, 31, 0.9) 100%)",
    [theme],
  );

  const handleSignIn = () => {
    navigate("/sign-in");
  }
  const handleGoogleSignIn = () => {

  }


  const handleSignUp = () => {
    navigate("/sign-up");
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >


      <Paper
        elevation={12}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundImage: gradient,
          backdropFilter: "blur(20px)",
          border: `1px solid ${theme.palette.primary.main}30`,
          boxShadow:
            theme.palette.mode === "light"
              ? `0 12px 40px ${theme.palette.primary.main}20`
              : `0 12px 40px rgba(0, 0, 0, 0.6)`,
          textAlign: "center",
          maxWidth: 450,
          width: "100%",
        }}
      >
        
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: `${theme.palette.primary.main}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${theme.palette.primary.main}30`,
            }}
          >
            <LockOutlined
              sx={{
                fontSize: 40,
                color: theme.palette.primary.main,
              }}
            />
          </Box>
        </Box>

        
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Access Required
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            lineHeight: 1.6,
            fontSize: "1.1rem",
          }}
        >
          Please sign in to your account or create a new one to continue accessing our platform.
        </Typography>

        
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Login />}
            onClick={handleSignIn}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
              },
              transition: "all 0.3s ease",
            }}
          >
            Sign In to Your Account
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<PersonAdd />}
            onClick={handleSignUp}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              borderWidth: 2,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: `${theme.palette.primary.main}08`,
                transform: "translateY(-1px)",
                borderWidth: 2,
              },
              transition: "all 0.3s ease",
            }}
          >
            Create New Account
          </Button>
        </Stack>


        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            or continue with
          </Typography>
        </Divider>

    
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleSignIn}
            sx={{
              flex: 1,
              py: 1.2,
              borderRadius: 3,
              textTransform: "none",
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                borderColor: theme.palette.secondary.dark,
                backgroundColor: `${theme.palette.secondary.main}08`,
              },
            }}
          >
            Google
          </Button>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 3,
            display: "block",
            fontSize: "0.85rem",
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Typography>
      </Paper>
    </Container>
  )
}
