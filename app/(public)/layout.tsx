import { ReactNode } from "react";
import NavBar from "./_components/NavBar";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />

      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
}
