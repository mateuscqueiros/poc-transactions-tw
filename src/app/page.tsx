"use client";

import { TransactionList } from "@/features/transactions/components/transaction-list";
import { formatCurrency } from "@/features/transactions/lib/format";
import { useTransactions } from "@/features/transactions/providers/transaction-provider";
import { IconArrowRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data: transactions } = useTransactions();

  const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const lastTransaction = transactions.reduce((acc, curr) => {
    dayjs(acc.completedAt).isAfter(dayjs(curr.completedAt)) && acc;
    return acc;
  });

  return (
    <div className="p-6 flex flex-col justify-between h-full">
      <div>
        <h1 className="text-2xl font-bold mb-4">Transações</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="card bg-base-300 p-4">
            <h3 className="font-semibold">Saldo disponível</h3>
            <p className="text-xl text-success">
              {formatCurrency(total, "pt-BR")}
            </p>
          </div>
          <div className="card bg-base-300 p-4">
            <h3 className="font-semibold">Última transação</h3>
            <p className="text-sm text-gray-500">
              Última transação em{" "}
              {dayjs(lastTransaction.completedAt).format("DD/MM [às] HH:mm")}
            </p>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary btn-lg mt-6"
        onClick={() => router.push("/pix")}
      >
        Criar Nova Transação
        <IconArrowRight className="ml-2 h-4 w-4" />
      </button>
      <div className="py-6">
        <TransactionList data={transactions} />
      </div>
    </div>
  );
}
