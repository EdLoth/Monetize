import { Header } from "@/components/Header";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  icons: {
    icon: '/logo.svg', // Verifique se o caminho está correto
  },
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>
  )
}

export default DashboardLayout;