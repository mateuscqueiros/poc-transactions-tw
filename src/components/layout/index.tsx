"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type LayoutProps = {} & React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const notHome = path !== "/";

  return (
    <div className="min-h-screen">
      {notHome && (
        <header className="py-3 flex justify-between max-w-lg w-full mx-auto">
          <div>
            <button className="btn btn-circle" onClick={() => router.back()}>
              <IconArrowLeft />
            </button>
          </div>
        </header>
      )}
      <main className="p-4 max-w-[1000px] w-full mx-auto">{children}</main>
    </div>
  );
}
