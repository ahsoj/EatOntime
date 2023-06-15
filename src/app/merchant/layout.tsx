"use client";
import React from "react";
import SideBar from "@components/Sidebar";
import MerchantBarContent from "./(component)/MerchantNavbar";
import DashboardMenuContent from "./(component)/DashboardMenuContent";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <MerchantBarContent handleDrawerToggle={handleDrawerToggle} />
      <SideBar
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        side="left"
        SidebarContent={<DashboardMenuContent />}
      >
        <div style={{ marginBlock: "1em" }}>{children}</div>
      </SideBar>
    </>
  );
}
