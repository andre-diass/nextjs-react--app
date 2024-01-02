import Navbar from "@/components/organisms/Navbar";
import { PropsWithChildren, useState } from "react";
import { Session } from "next-auth";

export default function ProtectedLayout({
  children,
  session,
}: PropsWithChildren<{ session?: Session }>) {
  const [showNav, setShowNav] = useState(false);

  function navState() {
    if (!showNav) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }

  return (
    <>
      <div>
        <button onClick={() => navState()}>tes</button>
        <div className="bg-gray-200 min-h-screen flex">
          <Navbar show={showNav} />
          <div className="flex-grow overflow-x-auto ">
            <main className="bg-neutral-100 my-2 mr-2 min-h-screen rounded-lg p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
