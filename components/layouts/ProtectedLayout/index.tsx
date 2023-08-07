import Navbar from "@/components/organisms/Navbar";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function ProtectedLayout({
  children,
  session,
}: PropsWithChildren<{ session?: Session }>) {
  return (
    <>
      <div className="bg-blue-900 min-h-screen flex">
        <Navbar />
        <main className="bg-slate-900 flex-grow my-2 mr-2 rounded-lg p-4">
          {children}
        </main>
      </div>
    </>
  );
}
