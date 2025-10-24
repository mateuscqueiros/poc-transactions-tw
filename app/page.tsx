"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-6 flex flex-col justify-between h-full">
      <div>
        <h1 className="text-2xl font-bold mb-4">Transações</h1>
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h3 className="font-semibold">Saldo disponível</h3>
            <p className="text-xl text-success">R$ 2.540,00</p>
          </div>
          <div className="card bg-base-200 p-4">
            <h3 className="font-semibold">Última transação</h3>
            <p className="text-sm text-gray-500">Ontem às 14:32</p>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary btn-lg mt-6"
        onClick={() => router.push("/pix")}
      >
        Iniciar Transação
      </button>
    </div>
  );
}
