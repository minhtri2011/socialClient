import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import loginBackground from "../assets/img/loginBackground.jfif";
import InputHidePasswordValidate from "../components/input/InputHidePasswordValidate";
import InputValidate from "../components/input/InputValidate";
import { useAuth } from "../hooks/useAuth";
import { register } from "../api/auth";
import { toast } from "react-hot-toast";

//todo: css styled
const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

//todo: validate form login
const schema = yup
  .object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    location: yup.string().trim().required("location is required"),
    occupation: yup.string().trim().required("occupation is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

//todo: Form login
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Initialize form fields with default values and register them
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      occupation: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  // Submit form data to console
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...rest } = data;
      setIsLoading(true);
      await register(rest);
      setIsLoading(false);
      reset();
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      toast.error(error)
      console.log(error);
    }
  };

  return (
    // Form container with form submission handler
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Email input field */}
      <Box display="grid" gridTemplateColumns={"1fr 1fr"} gap={"15px"}>
        <InputValidate
          autoFocus
          control={control}
          name="firstName"
          label="First Name"
          type="text"
          variant="outlined"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <InputValidate
          control={control}
          name="lastName"
          label="Last Name"
          type="text"
          variant="outlined"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Box>
      <InputValidate
        control={control}
        name="location"
        sx={{ mt: 2 }}
        label="Location"
        type="text"
        variant="outlined"
        error={!!errors.location}
        helperText={errors.location?.message}
      />
      <InputValidate
        control={control}
        name="occupation"
        sx={{ mt: 2 }}
        label="Occupation"
        type="text"
        variant="outlined"
        error={!!errors.occupation}
        helperText={errors.occupation?.message}
      />
      <InputValidate
        control={control}
        name="email"
        sx={{ mt: 2 }}
        label="Email"
        autoComplete="username"
        type="text"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {/* Password input field */}
      <InputHidePasswordValidate
        control={control}
        name="password"
        sx={{ mt: 2 }}
        variant="outlined"
        autoComplete="new-password"
        id="outlined-adornment-password"
        error={errors.password}
      />
      <InputHidePasswordValidate
        control={control}
        sx={{ mt: 2 }}
        name="confirmPassword"
        label="Confirm Password"
        variant="outlined"
        autoComplete="new-password"
        id="outlined-adornment-confirmPassword"
        error={errors.confirmPassword}
      />
      {/* Submit button */}
      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        sx={{
          mt: 2,
          textTransform: "capitalize",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="contained"
      >
        Sign up
        {/* Show loading icon when submiting  */}
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
const Register = () => {
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
            <Typography variant="h5">Get started</Typography>
            <Typography>Create your account now</Typography>

            {/* Login with Google button */}
            {/* <Button
              fullWidth
              variant="outlined"
              type="submit"
              sx={{ textTransform: "capitalize", gap: "5px" }}
            >
              <img src={GoogleIcon} width="20px" /> Login with Google
            </Button>

            <Typography>or</Typography> */}

            {/* Login form */}
            <RegisterForm />
            <Typography fontSize={".9rem"}>
              Already have an account?
              <LinkStyle to="/login">Login here</LinkStyle>
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

export default Register;
