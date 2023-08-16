import { PropsWithChildren } from "react";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-blue-900 h-screen w-screen flex items-center justify-center">
      <main>{children}</main>
    </div>
  );
}
