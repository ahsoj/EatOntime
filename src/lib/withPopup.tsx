import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { addressPopup } from "../redux/address";
import FindCurrentLocation from "./location";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const dispatch = useAppDispatch();

  const fillOpen: any = useAppSelector(
    (state: RootState) => state.address.fillAddress
  );

  return (
    <div>
      <Dialog
        open={fillOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Find your current address to continue"}</DialogTitle>
        <DialogContent>
          <FindCurrentLocation />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(addressPopup(false))}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
