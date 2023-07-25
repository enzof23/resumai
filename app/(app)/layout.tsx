import { DesktopNavbar, MobileNavbar } from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />

      <div className="grid min-h-screen place-items-center px-4 pb-4 pt-12 md:px-8 md:pb-6 md:pt-[60px]">
        {children}
      </div>
    </>
  );
}
