/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import store from "@/public/store.svg";
import dashboard from "@/public/dashboard.svg";
import products from "@/public/products.svg";
import orders from "@/public/orders.svg";
import categories from "@/public/categories.svg";
import settings from "@/public/settings.svg";
import { StaticImageData } from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface NavOptionsProps {
  closeNav: any;
  options: { to: string; logoSrc: StaticImageData; title: string }[];
}

function NavOptions({ options, closeNav }: NavOptionsProps) {
  const { pathname } = useRouter();

  return (
    <ul>
      {options.map((option) => (
        <Link
          href={option.to}
          key={"key" + option.to}
          onClick={closeNav}
          className={`flex items-center gap-2 my-2 pr-2 rounded-md ${
            pathname === option.to ? "bg-blue-200 text-black stroke-black" : ""
          }`}
        >
          <img
            src={option.logoSrc.src}
            alt={option.title}
            width={22}
            height={16}
            style={{
              filter: pathname === option.to ? "brightness(0) invert(0)" : "",
              stroke: pathname === option.to ? "red" : "#808080",
            }}
          />
          {option.title}
        </Link>
      ))}
    </ul>
  );
}

export default function Navbar({ show, closeNav }: any) {
  return (
    <aside
      className={
        (show ? "left-0" : "-left-full") +
        "  text-gray-500 p-4 fixed w-full bg-gray-200 h-full md:static md:w-auto transition-all z-10"
      }
    >
      <nav className="flex flex-col">
        <NavOptions
          closeNav={closeNav}
          options={[
            // { to: "/store", logoSrc: store, title: "Ecommerce Admin" },
            { to: "/app", logoSrc: dashboard, title: "Dashboard" },
            { to: "/app/products", logoSrc: products, title: "Products" },
            { to: "/app/orders", logoSrc: orders, title: "Orders" },
            { to: "/app/categories", logoSrc: categories, title: "Categories" },
            { to: "/app/settings", logoSrc: settings, title: "Settings" },
          ]}
        />
      </nav>
      <button
        onClick={async () => {
          await signOut({ redirect: true, callbackUrl: "/" });
        }}
        className=" flex bg-white text-slate-800 rounded-lg p-2 dark:text-slate-950"
      >
        Sign out
      </button>
    </aside>
  );
}
