import { Box, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";

export const IconButtonLoad = ({ ...props }) => {
  const { children, loading } = props;
  return (
    <Box sx={{ m: 1, position: "relative", zIndex: 1300 }}>
      {children}
      {loading && (
        <CircularProgress
          size={60}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export const ButtonLoad = ({ ...props }) => {
  const { children, loading } = props;
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {children}
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "#00ff64",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};
