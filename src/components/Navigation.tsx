import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardMedia from "@mui/material/CardMedia";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleBacktoTopClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleBacktoTopClick}
        role={"presentation"}
        sx={{ position: "fixed", bottom: 15, right: 15 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HomeNavigation({ ...props }) {
  const {
    children,
    renderMobileMenu,
    renderMenu,
    handleDrawerToggle,
    ...rest
  } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...rest}>
        <AppBar
          elevation={0}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          color="inherit"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <CardMedia
              title=""
              src="/logo.png"
              component="img"
              sx={{
                display: { xs: "none", sm: "block" },
                objectFit: "contain",
                width: 50,
                height: 50,
              }}
            />
            {children}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...rest}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
