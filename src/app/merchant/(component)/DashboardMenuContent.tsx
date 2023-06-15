import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import UpdateIcon from "@mui/icons-material/Update";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";

export default function DashboardMenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();

  const routeParams = useAppSelector(
    (state: RootState) => state.routeParams.id
  );

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  console.log(routeParams);

  const menuContent = [
    {
      path: "Dashboard",
      icon: <DashboardIcon />,
      route: `/merchant/${routeParams}/dashboard/`,
    },
    {
      path: "Store",
      icon: <StoreIcon />,
      route: `/merchant/${routeParams}/store/`,
    },
    {
      path: "Create Menu & Dish",
      icon: <AddCircleOutlineIcon />,
      route: `/merchant/${routeParams}/create/`,
    },
    {
      path: "Delivered",
      icon: <DeliveryDiningIcon />,
      route: `/merchant/${routeParams}/delivered/`,
    },
  ];

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {menuContent?.map((text: any, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
                router.push(text.route);
              }}
            >
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.path} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
