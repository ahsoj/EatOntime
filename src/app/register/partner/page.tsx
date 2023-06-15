"use client";
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
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import { saveAccountForm } from "../../../redux/registerStore";

interface Values {
  email: string;
  phone: string;
  res_name: string;
  res_owner: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  res_name: yup
    .string()
    .min(4, "your restaurant name must be more  than 4 chars")
    .required("Restaurant name is required"),
  res_owner: yup.string().required("Restaurant owner name is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phone: yup.string().min(10, "Enter a vaild phone number"),
});

export default function MerchantRegister({ ...props }) {
  const { handleStepUP, activeStep, getTheuserId } = props;
  const router = useRouter();

  const userData = useAppSelector((state: RootState) => state.formData);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      res_name: "",
      res_owner: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      try {
        dispatch(saveAccountForm(values));
        // await Authentication.Register(
        //   values.email,
        //   values.phone,
        //   // values.res_name,
        //   // values.res_owner,
        //   values.password
        // ).then((res: any) => {
        // getTheuserId(res.user.id);
        // });
        console.log(userData);
        handleStepUP(activeStep + 1);
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
          id="res_name"
          name="res_name"
          size="small"
          label="Restaurant Name"
          type="text"
          value={formik.values.res_name}
          onChange={formik.handleChange}
          sx={{ my: 2 }}
          error={formik.touched.res_name && Boolean(formik.errors.res_name)}
          helperText={formik.touched.res_name && formik.errors.res_name}
        />
        <TextField
          fullWidth
          id="res_owner"
          name="res_owner"
          size="small"
          label="Restaurant Owner Name"
          type="text"
          value={formik.values.res_owner}
          onChange={formik.handleChange}
          sx={{ my: 2 }}
          error={formik.touched.res_owner && Boolean(formik.errors.res_owner)}
          helperText={formik.touched.res_owner && formik.errors.res_owner}
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
      <Typography variant="subtitle1" color="inherit">
        Do you have an account ? <Link href="/signin">Sign in here</Link>
      </Typography>
    </div>
  );
}
