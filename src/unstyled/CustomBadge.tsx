import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CustomizedBadges({ ...props }) {
  const { onClick, children, ...rest } = props;
  return (
    <IconButton onClick={onClick} aria-label="cart">
      <StyledBadge showZero {...rest}>
        {children}
      </StyledBadge>
    </IconButton>
  );
}
