"use client";
import React from "react";
import dynamic from "next/dynamic";
import Authentication from "@sdk/Authentication";
import Store from "@sdk/Store";

const NavBarContent = dynamic(() => import("./(components)/HomeNavbar"), {
  loading: () => <p>Loading...</p>,
});
const SideBar = dynamic(() => import("@components/Sidebar"), {
  loading: () => <p>Loading...</p>,
});
const CartContent = dynamic(() => import("./(components)/CartContent"), {
  loading: () => <p>Loading...</p>,
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  React.useEffect(() => {
    const user: any = Authentication.getUser();
    Store.getCart(user.user_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <NavBarContent />
      <SideBar
        SidebarContent={<CartContent />}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        side="right"
      >
        <div style={{ marginBlock: "1em" }}>{children}</div>
      </SideBar>
    </>
  );
}
