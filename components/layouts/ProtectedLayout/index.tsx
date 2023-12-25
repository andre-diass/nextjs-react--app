import Navbar from "@/components/organisms/Navbar";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";

export default function ProtectedLayout({
  children,
  session,
}: PropsWithChildren<{ session?: Session }>) {
  return (
    <>
      <div className="bg-blue-900 min-h-screen flex">
        <Navbar />
        <div className="flex-grow overflow-x-auto ">
          <main className="bg-neutral-100 my-2 mr-2 min-h-screen rounded-lg p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
