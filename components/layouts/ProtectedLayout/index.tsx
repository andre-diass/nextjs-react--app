/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/organisms/Navbar";
import { PropsWithChildren, useState } from "react";
import { Session } from "next-auth";
import hamburguerIcon from "@/public/hamburguer.svg";

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
      <div className="flex p-2 px-5 bg-primary md:hidden z-30 ">
        <button onClick={() => navState()}>
          <img src={hamburguerIcon.src} alt="icon" width={25} height={25} />
        </button>
      </div>
      <div className="bg-primary min-h-screen flex">
        <Navbar show={showNav} closeNav={() => navState()} />
        <div className="flex-grow overflow-x-auto flex flex-col h-screen">
          <main className="bg-secondary md:my-2 mx-2 rounded-lg p-4 flex-grow">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
