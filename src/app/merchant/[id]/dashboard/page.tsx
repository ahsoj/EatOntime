"use client";
import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "../../../../redux/hook";
import { getParams } from "../../../../redux/routeParams";
import Store from "@sdk/merchants/Store";
import { useGetMessagesQuery } from "../../../../redux/stream/notification";

interface Params {
  params: {
    id: string;
  };
  searchParams: any;
}

// selected={selectedIndex === 0}

export default function MerchantDashboard({ params, searchParams }: Params) {
  const dispatch = useAppDispatch();

  const [OrderData, setOrderData] = React.useState([]);

  React.useEffect(() => {
    useGetMessagesQuery("notification");
    dispatch(getParams(params.id));
    Store.getMyOrder(params.id)
      .then((res: any) => {
        res.map((data: any) => {
          Store.getMenu(data.menu_item).then((resp) => (res["items"] = resp));
          // Store.getCustomer().then((resp) => console.log(resp));
        });
        setOrderData(res);
      })
      .catch((err) => console.log(err));
  }, [params]);

  // console.log(params, searchParams, selectedSegment);
  return (
    <Stack gap={3}>
      {OrderData.map((order: any, index: number) => (
        <OrderList orderItems={order} OrderData={OrderData} key={index} />
      ))}
    </Stack>
  );
}

const orderData = {
  orderCode: "890543",
  orderTimeStamp: "01/07/23 at 04:35pm",
  orderUserName: "Joshua",
  orderUserPhone: "+2519 0320 2058",
  orderTotalAmount: "159.99",
  orderQuantity: "4",
  itemType: "delivery",
};

const orderItems = [
  "Lorem ipsum dolor",
  "aliquid porro velit",
  "mollitia magnam iste",
  "Ab ad similique, obcaecati earum",
  "sit amet consectetur adipisicing",
];

const OrderInfo = ({ ...props }) => {
  const { orderItems } = props;
  return (
    <Stack
      direction="row"
      flexWrap={"wrap"}
      gap={2}
      justifyContent={"space-between"}
      sx={{ ".MuiTypography-subtitle2": { opacity: 0.5 } }}
    >
      <Box>
        <Typography variant="subtitle2" color="inherit">
          Order Code
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderData.orderCode}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="inherit">
          Date & Time
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderData.orderTimeStamp}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="inherit">
          Order From
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderData.orderUserName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="inherit">
          To Contact
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderData.orderUserPhone}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="inherit">
          Total Amount
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderItems.price}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="inherit">
          Total Items
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderItems.quantity}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" color="inherit">
          Type
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {orderData.itemType}
        </Typography>
      </Box>
    </Stack>
  );
};

const Count = ({ ...props }) => {
  const { quantity } = props;
  return <h3>x{quantity}</h3>;
};

export const OrderList = ({ ...props }) => {
  const { orderItems, OrderData } = props;
  console.log();
  return (
    <>
      <Container maxWidth={"xl"}>
        <Box sx={{ border: 2, borderColor: "divider", p: 3 }}>
          <OrderInfo orderItems={orderItems} />
          <Divider variant="middle" sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: " flex",
                flexDirection: "row",
                alignItems: "center",
                my: 3,
                gap: 2,
              }}
            >
              <Typography variant="body1" fontWeight={900} color="inherit">
                Ordered <br /> Items
              </Typography>
              <Stack
                direction="row"
                gap={1}
                flexWrap={"wrap"}
                alignItems={"center"}
              >
                {OrderData["items"]?.map((data: any, index: number) => (
                  <Chip
                    key={index}
                    label={data.item_name}
                    size="small"
                    deleteIcon={<Count quantity={data?.quantity} />}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                enqueueSnackbar("Hello joshua", {
                  autoHideDuration: 3000,
                  variant: "success",
                  anchorOrigin: {
                    horizontal: "center",
                    vertical: "top",
                  },
                })
              }
              sx={{ wordBreak: "keep-all" }}
              disableElevation
            >
              Move to Cooking
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
