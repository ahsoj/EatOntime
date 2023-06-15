import Link from "next/link";
import {
  Stack,
  Box,
  Typography,
  CardMedia,
  InputBase,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Footer({ ...props }) {
  const {} = props;
  return (
    <Stack sx={footer.footerWrapper} direction="row">
      <Box sx={footer.socialLink}>
        <Link href="/">
          <CardMedia
            title=""
            component="img"
            src="https://mkeyasu.github.io/web_landing/images/logo.png"
            sx={{
              width: 150,
              my: 1,
              objectFit: "contain",
            }}
          />
        </Link>
        <Typography variant="body2" color="inherit">
          Our job is to filling your tummy with delicious food and with fast
          service.
        </Typography>
        {/* <Box></Box> */}
      </Box>
      <Box>
        <Typography variant="h6" color="inherit">
          About
        </Typography>
        {footerData.about?.map((value, index) => (
          <Typography key={index} variant="body1" color="inherit">
            {value.title}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" color="inherit">
          Company
        </Typography>
        {footerData.company?.map((value, index) => (
          <Typography key={index} variant="body1" color="inherit">
            {value.title}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" color="inherit">
          Support
        </Typography>
        {footerData.support?.map((value, index) => (
          <Typography key={index} variant="body1" color="inherit">
            {value.title}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" color="innherit">
          Get in Touch
        </Typography>
        <Typography variant="body1" color="inherit">
          Question or feedback ?
        </Typography>
        <Typography variant="body1" color="inherit">
          We love to hear from you
        </Typography>
        <Paper sx={footer.emailPaper}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Email Address"
            inputProps={{ "aria-label": "feedback" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton aria-label="">
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
}

export const footer = {
  footerWrapper: {
    flexWrap: "wrap",
    gap: 5,
    m: 5,
    alignItems: "start",
    justifyContent: "space-between",
    ".MuiTypography-h6": {
      mb: 3,
      fontWeight: 800,
    },
    ".MuiTypography-body1": {
      fontWeight: 600,
    },
  },
  socialLink: {
    ".MuiTypography-body2": {
      maxWidth: 250,
    },
  },
  emailPaper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 1,
    borderRadius: 10,
    boxShadow: "0 0 4px #009999",
    my: 1,
  },
};

export const footerData = {
  about: [
    {
      path: "",
      title: "About Us",
    },
    {
      path: "",
      title: "Features",
    },
    {
      path: "",
      title: "News",
    },
    {
      path: "",
      title: "Menu",
    },
  ],
  company: [
    {
      path: "",
      title: "Why EatonTime?",
    },
    {
      path: "",
      title: "Partner with us",
    },
    {
      path: "",
      title: "FAQ",
    },
    {
      path: "",
      title: "Blog",
    },
  ],
  support: [
    {
      path: "",
      title: "account",
    },
    {
      path: "",
      title: "support center",
    },
    {
      path: "",
      title: "feedback center",
    },
    {
      path: "",
      title: "contact us",
    },
    {
      path: "",
      title: "accessiblity",
    },
  ],
};
