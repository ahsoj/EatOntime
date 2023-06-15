"use client";
import React, { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import Footer from "@components/Footer";
import { useRouter, usePathname } from "next/navigation";
import Navigation from "@components/root/Navbar";
import {
  Typography,
  Box,
  Paper,
  InputBase,
  Stack,
  Divider,
  Button,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { debounce } from "@mui/material/utils";
import { Autocomplete } from "../lib/Autocomplete";
import FindCurrentLocation from "@lib/location";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const address = useAppSelector((state: RootState) => state.address);

  const theme = useTheme();

  console.log(address);

  const handleSidebarOpen = () => {
    setIsOpen(true);
  };
  const handleSidebarClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Navigation
        theme={theme}
        router={router}
        isOpen={isOpen}
        handleSidebarOpen={handleSidebarOpen}
        handleSidebarClose={handleSidebarClose}
      />
      <Stack direction={"column"} sx={{ my: 10, width: 1 / 1, gap: 10 }}>
        <HomeHero />
        <Service />
        <DownloadTheApp />
      </Stack>
      <div style={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h3" fontWeight={900} color="inherit">
            Find Your Restaurant or Delivery Address
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.6 }} color="inherit">
            Double click to detect your current location
          </Typography>
        </Box>
        <FindCurrentLocation />
      </div>
      <Footer />
    </Box>
  );
}

export const HomeHero = () => {
  const [content, setContent] = React.useState<object[]>([]);
  const [selectValue, setSelectValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const fetch = useMemo(
    () =>
      debounce((request: { input: string }) => {
        if (request.input.length > 0)
          Autocomplete(request.input)
            .then((res: any) => setContent(res.features))
            .then((err: any) => console.log(err));
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (active) {
      fetch({ input: inputValue });
      setOpen(true);
    }

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  const handleInputValue = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleClose = (value: any) => {
    setSelectValue(value);
    setOpen(false);
  };

  return (
    <Stack
      sx={{
        pt: { md: 15, xs: 5 },
        alignItems: "center",
        margin: "auto",
        justifyContent: "center",
        textAlign: "center",
        gap: 15,
      }}
      direction={{ md: "row", xs: "column-reverse" }}
    >
      <Box
        sx={{
          maxWidth: 500,
          px: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          textAlign: { md: "start", xs: "center" },
          ".MuiTypography-subtitle1": {
            fontWeight: 700,
            textTransform: "uppercase",
            position: "relative",
            "&:after": {
              content: 'url("/rocket.svg")',
              position: "absolute",
              bottom: 0,
            },
          },
          ".MuiTypography-h3": {
            fontWeight: 900,
            // py: 2,
            b: {
              color: "#00ff64",
              fontWeight: 900,
              position: "relative",
              "&:after": {
                content:
                  'url("https://mkeyasu.github.io/web_landing/images/fun-underline.svg")',
                position: "absolute",
                transform: "translate(-95px,30px)",
              },
            },
          },
          ".MuiTypography-subtitle2": {},
        }}
      >
        <Typography variant="subtitle1" color="inherit">
          Deliver happyness to your door step.
        </Typography>
        <Typography variant="h3" color="inherit">
          Be The Fastest In Delivering Your <b>Food!</b>
        </Typography>
        <FindLocation
          content={content}
          handleClose={handleClose}
          inputValue={inputValue}
          isOpen={isOpen}
        >
          <CustomizedInputBase
            fetch={fetch}
            selectValue={selectValue}
            handleInputValue={handleInputValue}
          />
        </FindLocation>
      </Box>
      <Box sx={{ maxWidth: 500 }}>
        <CardMedia
          title=""
          sx={{ objectFit: "contain" }}
          component={"img"}
          src={"https://mkeyasu.github.io/web_landing/images/chef.png"}
        />
      </Box>
    </Stack>
  );
};

export const Service = ({ ...props }) => {
  const {} = props;
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          my: 4,
          ".MuiTypography-subtitle1": {
            fontWeight: 600,
            color: "#00ff64",
          },
          ".MuiTypography-h5": {
            fontWeight: 900,
          },
        }}
      >
        <Typography variant="subtitle1" color="inherit">
          WHAT WE SERVE
        </Typography>
        <Typography variant="h5" color="inherit">
          Your Favorite Food <br /> Delivery Partner
        </Typography>
      </Box>
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{ alignItems: "center", justifyContent: "center", gap: 10 }}
      >
        {serviceValue.map((value, index) => (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              ".MuiTypography-h6": {
                fontWeight: 800,
              },
              ".MuiTypography-subtitle2": {
                margin: "0 auto",
                justifySelf: "center",
                fontWeight: 700,
                maxWidth: 200,
              },
            }}
            key={index}
          >
            <CardMedia
              title={value.title}
              src={value.image}
              sx={{ maxWidth: 250, objectFit: "contain" }}
              component="img"
            />
            <div>
              <Typography variant="h6" color="inherit">
                {value.title}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {value.subtitle}
              </Typography>
            </div>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export const FindLocation = ({ ...props }) => {
  const { children, content, inputValue, handleClose, isOpen } = props;
  // console.log(content);
  return (
    <Paper sx={{ position: "relative" }}>
      {children}
      {inputValue.length >= 1 && isOpen && (
        <Paper
          sx={{
            ".MuiTypography-subtitle2": { opacity: 0.6 },
            p: 1,
            maxHeight: "200px",
            position: "absolute",
            width: 1 / 1,
            overflow: "auto",
          }}
        >
          <List>
            {content.map((data: any, index: number | null) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={(ev: any) =>
                    handleClose(ev.currentTarget.textContent)
                  }
                >
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${data.properties.formatted}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Paper>
  );
};

export const CustomizedInputBase = ({ ...props }) => {
  const { fetch, handleInputValue, selectValue } = props;

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        gap: 1,
        alignItems: "center",
        ".MuiButton-root": { textTransform: "capitalize", fontWeight: 700 },
        ".MuiButton-contained": {
          backgroundColor: "#00ff64",
          color: "#f8fafc",
          "&:hover": {
            backgroundColor: "#00ff64",
            borderColor: "#00ff64",
            color: "#f8fafc",
          },
        },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        defaultValue={selectValue}
        onInput={handleInputValue}
        placeholder="Find Your delivery location"
        inputProps={{ "aria-label": "delivery location" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton aria-label="">
        <MyLocationIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button
        variant="contained"
        endIcon={<ChevronRightIcon />}
        disableElevation
        color="inherit"
      >
        Discover
      </Button>
    </Paper>
  );
};

export const DownloadTheApp = ({ ...props }) => {
  const {} = props;
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          maxWidth: 400,
          p: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" color="inherit">
          DOWNLOAD APP
        </Typography>
        <Typography variant="h5" fontWeight={900} color="inherit">
          Get Started with EOT Today !
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          Discover the food whereever and whenever and get your food delivered
          quickly
        </Typography>
        <Button disableElevation variant="outlined" color="primary">
          Download Now
        </Button>
      </Box>
      <CardMedia
        title=""
        src="/get_app.png"
        sx={{ maxWidth: 300, objectFit: "contain" }}
        component={"img"}
      />
    </Stack>
  );
};

export const serviceValue = [
  {
    image: "https://mkeyasu.github.io/web_landing/images/service_i/order_i.svg",
    title: "Easy to order",
    subtitle: "you only need a few steps in ordering food",
  },
  {
    image:
      "https://mkeyasu.github.io/web_landing/images/service_i/deliver_i.svg",
    title: "Fastest delivery",
    subtitle: "Delivery that is always ontime even faster",
  },
  {
    image:
      "https://mkeyasu.github.io/web_landing/images/service_i/quality_i.svg",
    title: "Best quality",
    subtitle: "Not only fast for us quality is also number one",
  },
];
