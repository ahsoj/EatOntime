import React from "react";
import Link from "next/link";
import SideBar from "@components/root/Sidebar";
import {
  CardMedia,
  Toolbar,
  AppBar,
  Box,
  Stack,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { ColorModeContext } from "../../app/EmotionStyleRegistary";
import MUISwitch from "@unstyled/ThemeSwitch";

export default function Navigation({ ...props }) {
  const { handleSidebarOpen, isOpen, handleSidebarClose, theme } = props;
  const colorMode = React.useContext(ColorModeContext);
  const router = useRouter();
  const content = (
    <Stack direction={{ md: "row", xs: "column" }} sx={nav.ctaWrapper}>
      <Button
        onClick={() => router.push("/register")}
        disableElevation
        variant="contained"
      >
        Register
      </Button>
      <Button
        onClick={() => router.push("/signin")}
        startIcon={<LoginOutlinedIcon />}
        variant="outlined"
      >
        SignIn
      </Button>
    </Stack>
  );
  return (
    <AppBar
      elevation={0}
      sx={nav.appbar}
      component="header"
      position="fixed"
      color="inherit"
    >
      <Toolbar component="nav" sx={nav.toolbar}>
        <Link style={{ flexGrow: 1 }} href="/">
          <CardMedia
            src={"https://mkeyasu.github.io/web_landing/images/logo.png"}
            sx={{ width: 150 }}
            component="img"
          />
        </Link>
        <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
          <div onClick={() => colorMode.toggleColorMode()}>
            <MUISwitch
              checked={theme.palette.mode === "light" ? false : true}
            />
          </div>
          <IconButton aria-label="menu" onClick={handleSidebarOpen}>
            <MenuIcon />
          </IconButton>
          <Box sx={nav.ctaWrapperBox}>{content}</Box>
        </Box>
      </Toolbar>
      <SideBar
        content={content}
        isOpen={isOpen}
        theme={theme}
        handleSidebarClose={handleSidebarClose}
      />
    </AppBar>
  );
}

export const nav = {
  appbar: {
    borderBottom: 1,
    borderColor: "divider",
  },
  toolbar: {
    justifyContent: "space-between",
    display: "flex",
    ".MuiIconButton-root": { display: { md: "none", xs: "flex" } },
  },
  ctaWrapperBox: {
    display: { md: "flex", xs: "none" },
  },
  ctaWrapper: {
    gap: 2,
    alignItems: "center",
    display: "flex",
    p: 1,
    ".MuiButton-root": {
      fontWeight: 900,
      borderRadius: 0,
      width: 1 / 1,
    },
    ".MuiButton-contained": {
      backgroundColor: "#00ff64",
      color: "#f8fafc",
      "&:hover": {
        backgroundColor: "#00ff64",
        borderColor: "#00ff64",
        color: "#f8fafc",
      },
    },
    ".MuiButton-outlined": {
      backgroundColor: "transparent",
      color: "#00ff64",
      borderColor: "#00ff64",
      "&:hover": {
        backgroundColor: "#00ff64",
        borderColor: "#00ff64",
        color: "#f8fafc",
      },
    },
  },
};
