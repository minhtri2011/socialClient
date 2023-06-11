import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { login } from "../api/auth";
import GoogleIcon from "../assets/img/googleIcon.png";
import loginBackground from "../assets/img/loginBackground.jfif";
import InputHidePasswordValidate from "../components/input/InputHidePasswordValidate";
import InputValidate from "../components/input/InputValidate";
import { useAuth } from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

//todo: css styled
const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

//todo: validate form login
const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

//todo: Form login
const LoginForm = () => {
  const { login, isLoading, error, user } = useAuth();
  // Initialize form fields with default values and register them
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // Submit form data to console
  const onSubmit = (data) => login(data);

  return (
    // Form container with form submission handler
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Email input field */}
      <InputValidate
        control={control}
        name="email"
        label="Email"
        type="text"
        variant="outlined"
        error={!!errors.email}
        autoCompleteWhenStart
        helperText={errors.email?.message}
      />

      {/* Password input field */}
      <InputHidePasswordValidate
        control={control}
        name="password"
        sx={{ mt: 2 }}
        autoCompleteWhenStart
        variant="outlined"
        id="outlined-adornment-password"
        error={errors.password}
      />
      {/* Submit button */}
      <Button
        type="submit"
        fullWidth
        sx={{ mt: 2, textTransform: "capitalize" }}
        variant="contained"
        disabled={isLoading}
      >
        Login

        {/* check isLoading and show loading icon */}
        {isLoading && (
          <CircularProgress
            color="inherit"
            size={15}
            sx={{ marginLeft: "5px" }}
          />
        )}
      </Button>
    </Box>
  );
};

//todo: Login page
const Login = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container spacing={0} sx={{ height: "100vh" }}>
        {/* Left half of the screen */}
        <Grid
          item
          xs={12}
          sm={9}
          md={8}
          lg={6}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
              width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
            }}
          >
            <Avatar>H</Avatar>
            <Typography variant="h5">Hello again</Typography>
            <Typography>Welcome back, you've been missed</Typography>

            {/* Login with Google button */}
            <Button
              fullWidth
              variant="outlined"
              type="submit"
              sx={{ textTransform: "capitalize", gap: "5px" }}
            >
              <img src={GoogleIcon} width="20px" /> Login with Google
            </Button>
            <Typography>or</Typography>

            {/* Login form */}
            <LoginForm />

            {/* Link to register page  */}
            <Typography fontSize={".9rem"}>
              Don't have account?{" "}
              <LinkStyle to="/register">Click here</LinkStyle>
            </Typography>
          </Box>
        </Grid>

        {/* Right half of the screen (hidden on small screens) */}
        <Grid
          item
          xs={0}
          sm={3}
          md={4}
          lg={6}
          display={{ xs: "none", sm: "block" }}
        >
          <Box
            component="img"
            src={loginBackground}
            display="block"
            maxHeight
            maxWidth
            sx={{ width: "100%", objectFit: "cover", height: "100%" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
