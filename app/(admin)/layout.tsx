import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideNavigation } from "@/components/SideNavigation";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body      >
        <SidebarProvider>
          <SideNavigation></SideNavigation>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
