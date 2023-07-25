import Logo from "../components/Logo";

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="px-5 py-4 hidden flex-1 md:flex md:flex-col">
        <div className="flex">
          <Logo />
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col md:grid md:place-items-center">
        <div className="md:hidden flex">
          <Logo />
        </div>

        {children}
      </div>
    </div>
  );
}
