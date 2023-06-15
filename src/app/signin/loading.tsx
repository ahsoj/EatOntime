"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        top: 0,
      }}
    >
      <LinearProgress color="success" />
    </Box>
  );
}
