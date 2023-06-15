import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addTocart } from "../../../redux/cart";
import Store from "@sdk/Store";
import Authentication from "@sdk/Authentication";
import { RootState } from "../../../redux/store";

export default function ProductCard({ ...props }) {
  const { product } = props;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cartAction.items);
  let user_id: any = Authentication.getUser();
  return (
    <Card
      sx={{ maxWidth: 275, border: 1, borderColor: "divider" }}
      elevation={0}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          title=""
          src={product.item_picture}
          sx={{ objectFit: "contain", p: 1, maxHeight: 225 }}
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="subtitle1" component="div">
              {product.item_name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              ${product.current_price}
            </Typography>
          </div>
          <Typography variant="caption" sx={{ opacity: 0.8 }} color="inherit">
            {product.item_descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider variant="middle" />
      <CardActions
        sx={{
          justifyContent: "space-between",
          ".MuiButton-root": { textTransform: "capitalize" },
        }}
      >
        <Button
          size="small"
          disableElevation
          variant="outlined"
          color="inherit"
          onClick={() => {
            if (user_id) {
              user_id = String(user_id.user_id).toLowerCase();
              Store.createOrder(cart, user_id)
                .then((res) => {
                  dispatch(addTocart(product));
                  console.log(res);
                })
                .catch((err) => console.log(err));
            }
          }}
        >
          Add to cart
        </Button>
        <Button variant="text" color="inherit" disabled>
          (25) review
        </Button>
      </CardActions>
    </Card>
  );
}
