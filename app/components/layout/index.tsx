"use client";

import { useState } from "react";

export type LayoutProps = {} & React.PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Toggle (para mobile) */}
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
      />

      {/* Conteúdo principal */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-200 sticky top-0 z-10">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-bold text-lg">Painel</div>
          <div className="flex-none">
            <button className="btn btn-sm btn-primary">Ação</button>
          </div>
        </div>

        {/* Conteúdo */}
        <main className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100">
          <li className="menu-title text-base-content/70">Navegação</li>
          <li>
            <a className="active">Dashboard</a>
          </li>
          <li>
            <a>Usuários</a>
          </li>
          <li>
            <a>Configurações</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
