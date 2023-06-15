import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Authentication from "@sdk/Authentication";
import {
  Button,
  TextField,
  Divider,
  Typography,
  Stack,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonLoad } from "@unstyled/Addload";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { createCustomer } from "@sdk/Action";

interface Values {
  email: string;
  phone: string;
  password: string;
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
  phone: yup.string().min(10, "Enter a vaild phone number"),
});

export default function Register({ ...props }) {
  const { handleStepUP, continueAs, activeStep, getTheuserId, userId } = props;
  const router = useRouter();
  if (activeStep === 2) {
    sessionStorage.removeItem("step-key");
    sessionStorage.removeItem("uid-key");
    sessionStorage.removeItem("type-key");
  }
  if (continueAs === "customer" && activeStep === 2) {
    createCustomer(userId)
      .then(() => router.push("/signin"))
      .catch((err) => console.log(err));
  }
  const address = useAppSelector((state: RootState) => state.address);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values: Values) => {
      try {
        await Authentication.Register(
          values.email,
          values.phone,
          values.password,
          address,
          continueAs
        ).then((res: any) => {
          getTheuserId(res.user.id);
          handleStepUP(activeStep + 1);
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div style={{ maxWidth: 500, textAlign: "center", paddingInline: 5 }}>
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
          id="phone"
          name="phone"
          size="small"
          label="Phone Number"
          type="text"
          // inputProps={{ pattern: "[0-9]" }}
          value={formik.values.phone}
          onChange={formik.handleChange}
          sx={{ my: 2 }}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
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
      <Divider sx={{ my: 2 }} variant="middle">
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
        Do you have an account ? <Link href="/signin">Sign in here</Link>
      </Typography>
    </div>
  );
}
