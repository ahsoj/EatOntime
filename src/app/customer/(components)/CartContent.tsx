import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CardActionArea } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import React from "react";

export default function CartContent() {
  const cart = useAppSelector((state: RootState) => state.cartAction.items);
  const total_price = useAppSelector(
    (state: RootState) => state.cartAction.total_price
  );
  let sum_price = 0;
  for (let i = 0; i < total_price.length; i++) {
    sum_price += total_price[i];
  }

  return (
    <Box sx={{ mt: 10, px: 1 }}>
      <Stack
        direction="column"
        sx={{
          ".MuiTypography-body2": { display: "flex", alignItems: "end" },
        }}
        alignItems={"start"}
        gap={1}
      >
        <Typography
          variant="body1"
          textTransform={"capitalize"}
          component="div"
          color="inherit"
        >
          <PersonIcon />
          <span>Eyasu Chaka</span>
        </Typography>
        <Typography
          variant="body1"
          textTransform={"capitalize"}
          component="div"
          color="inherit"
        >
          <PlaceIcon />
          <span>Saris Addis Abeba</span>
        </Typography>
      </Stack>
      <Divider variant="middle" sx={{ my: 3 }} />
      <Box>
        <Typography variant="body1" fontWeight={900} color="inherit">
          My Order
        </Typography>
      </Box>
      <Divider variant="middle" sx={{ my: 3 }} />
      <Box
        sx={{
          maxHeight: 500,
          overflow: "auto",
        }}
      >
        {cart.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              ".MuiTypography-body1": { opacity: 0.4 },
            }}
          >
            <Typography variant="body1" fontWeight={900} color="inherit">
              You have 0 order yet, add your first order now.
            </Typography>
          </Box>
        )}
        {cart?.map((cartItem: any, index: number) => (
          <CartItems cartItem={cartItem} key={index} />
        ))}
      </Box>
      <Divider variant="middle" sx={{ my: 3 }} />
      <Box>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography
              variant="subtitle1"
              fontWeight={900}
              sx={{ opacity: 0.8 }}
              color="inherit"
            >
              Delivery
            </Typography>
            <Typography variant="subtitle2" color="inherit">
              $ 0
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography
              variant="subtitle1"
              fontWeight={900}
              sx={{ opacity: 0.8 }}
              color="inherit"
            >
              Total
            </Typography>
            <Typography variant="subtitle2" color="inherit">
              $ {Math.round(sum_price)}
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          disableElevation
          fullWidth
          sx={{ textTransform: "capitalize", width: 1 / 1, my: 2 }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

export const CartItems = ({ ...props }) => {
  const { cartItem } = props;
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{ my: 2, border: 1, borderColor: "divider" }}
      // justifyContent={"space-between"}
    >
      <CardActionArea
        sx={{ p: 1, display: "flex", gap: 2, alignItems: "center" }}
      >
        <CardMedia
          title=""
          sx={{ maxWidth: 60, objectFit: "contain" }}
          src={cartItem.item_picture}
          component={"img"}
        />
        <Box>
          <Typography variant="subtitle2" color="inherit">
            {`${cartItem.item_name?.slice(0, 15)}...`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Typography variant="subtitle2" color="inherit">
              x{cartItem.quantity}
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              +{cartItem.current_price}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Stack>
  );
};
