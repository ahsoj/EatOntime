import React from "react";
import HomeNavigation from "@components/Navigation";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../EmotionStyleRegistary";
import CustomizedBadges from "@unstyled/CustomBadge";
import MUISwitch from "@unstyled/ThemeSwitch";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Authentication from "@sdk/Authentication";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBarContent({ ...props }) {
  const { handleDrawerToggle } = props;
  const theme = useTheme();
  const router = useRouter();
  const colorMode = React.useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const _user = Authentication.getUser();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  let sum_quantity = 0;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My account</ListItemText>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem
        onClick={() => {
          handleMenuClose();
          Authentication.Logout();
        }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <CustomizedBadges max={9} badgeContent={4} color="error">
            <BookmarksOutlinedIcon />
          </CustomizedBadges>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <CustomizedBadges max={9} badgeContent={sum_quantity} color="error">
            <ShoppingCartOutlinedIcon />
          </CustomizedBadges>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => colorMode.toggleColorMode()}>
        <MUISwitch checked={theme.palette.mode === "light" ? false : true} />
        <p>Theme</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <HomeNavigation
        renderMobileMenu={renderMobileMenu}
        renderMenu={renderMenu}
        handleDrawerToggle={handleDrawerToggle}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <CustomizedBadges max={9} badgeContent={4} color="error">
            <BookmarksOutlinedIcon />
          </CustomizedBadges>

          <CustomizedBadges max={9} badgeContent={sum_quantity} color="error">
            <ShoppingCartOutlinedIcon />
          </CustomizedBadges>
          <div onClick={() => colorMode.toggleColorMode()}>
            <MUISwitch
              checked={theme.palette.mode === "light" ? false : true}
            />
          </div>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </HomeNavigation>
    </>
  );
}

//
// <Box sx={{ flexGrow: 1 }} />
// <Stack
//   direction="row"
//   gap={2}
//   alignItems={"center"}
//   sx={{ ".MuiButton-root": { textTransform: "capitalize" } }}
// >
//   <div onClick={() => colorMode.toggleColorMode()}>
//     <MUISwitch
//       checked={theme.palette.mode === "light" ? false : true}
//     />
//   </div>
//   <Button
//     onClick={() => router.push("/signin")}
//     variant="outlined"
//     size="small"
//     disableElevation
//     color="primary"
//   >
//     Sign in
//   </Button>
//   <Button
//     onClick={() => router.push("/register")}
//     variant="contained"
//     size="small"
//     disableElevation
//     color="primary"
//   >
//     Register
//   </Button>
// </Stack>
