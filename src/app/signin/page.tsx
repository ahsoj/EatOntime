"use client";
import Authentication from "@sdk/Authentication";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import { ButtonLoad } from "@unstyled/Addload";

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validationSchema: validationSchema,
    onSubmit: async (values: Values) => {
      try {
        await Authentication.Login(
          values.email,
          values.password,
          values.remember
        ).then(() => router.push("/home"));
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });

  const { setFieldValue } = formik;

  return (
    <div
      style={{
        maxWidth: 500,
        display: "flex",
        paddingInline: 5,
        marginInline: "auto",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="inherit">
            Welcome back !
          </Typography>
          <Typography variant="subtitle2" color="inherit">
            continue with your account
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            size="small"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={{ my: 2 }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            size="small"
            id="password"
            name="password"
            type="password"
            label="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            sx={{ my: 2 }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <FormControlLabel
              onChange={formik.handleChange}
              control={
                <Checkbox
                  onChange={(ev) =>
                    setFieldValue("remember", ev.target.checked)
                  }
                />
              }
              label="Remember me"
            />
            <Link
              href="/account/password-reset"
              style={{ textDecoration: "none" }}
            >
              Reset Password!
            </Link>
          </Stack>
          <ButtonLoad loading={formik.isSubmitting}>
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}
              disabled={formik.isSubmitting}
              sx={{
                my: 2,
                backgroundColor: "#00ff64",
                color: "#f8fafc",
                "&:hover": {
                  backgroundColor: "#00ff64",
                  borderColor: "#00ff64",
                  color: "#f8fafc",
                },
              }}
              color="primary"
              variant="contained"
              fullWidth
              disableElevation
              type="submit"
            >
              Continue
            </Button>
          </ButtonLoad>
        </form>
        <Divider sx={{ my: 1 }} variant="middle">
          <Typography variant="h6" fontWeight={900} color="inherit">
            OR
          </Typography>
        </Divider>
        <Stack
          direction="column"
          sx={{
            ".MuiCardMedia-root": {
              width: 30,
              height: 30,
              my: 0.5,
              objectFit: "contain",
            },
            ".MuiButton-root": {
              my: 1,
              textTransform: "capitalize",
            },
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            size="small"
            disableElevation
            startIcon={
              <CardMedia title="" component="img" src="/google-logo.svg" />
            }
          >
            Continue with Google
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            disableElevation
            startIcon={
              <CardMedia title="" component="img" src="/facebook-logo.svg" />
            }
          >
            Continue with Facebook
          </Button>
        </Stack>
        <Typography variant="subtitle1" color="inherit">
          Don't have an account ? <Link href="/register">Sign up here</Link>
        </Typography>
      </div>
    </div>
  );
}
