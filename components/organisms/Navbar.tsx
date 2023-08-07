import Link from "next/link";
import store from "../../public/store.svg";
import dashboard from "../../public/dashboard.svg";
import products from "../../public/products.svg";
import orders from "../../public/orders.svg";
import settings from "../../public/settings.svg";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface NavOptionsProps {
  options: { to: string; logoSrc: StaticImageData; title: string }[];
}

function NavOptions({ options }: NavOptionsProps) {
  return (
    <ul>
      {options.map((option) => (
        <Link
          href={option.to}
          key={"key" + option.to}
          className="flex items-center gap-2 my-2"
        >
          <Image
            src={option.logoSrc.src}
            alt={option.title}
            width={22}
            height={16}
          />
          {option.title}
        </Link>
      ))}
    </ul>
  );
}

export default function Navbar() {
  return (
    <aside className="text-white p-4 ">
      <nav className="flex flex-col">
        <NavOptions
          options={[
            { to: "/store", logoSrc: store, title: "Ecommerce Admin" },
            { to: "/app", logoSrc: dashboard, title: "Dashboard" },
            { to: "app/products", logoSrc: products, title: "Products" },
            { to: "/orders", logoSrc: orders, title: "Orders" },
            { to: "/settings", logoSrc: settings, title: "Settings" },
          ]}
        />
      </nav>
      <button
        onClick={async () => {
          await signOut({ redirect: true, callbackUrl: "/" });
        }}
        className=" flex bg-white rounded-lg p-2 dark:text-slate-950"
      >
        Sign out
      </button>
    </aside>
  );
}
