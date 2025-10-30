"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "@/lib/api";
import { TransactionType } from "../types";
import { getTransactions } from "../api";

// Defina a URL da sua API mock
const MOCK_API_URL = "https://mocki.io/v1/1342612f-8d55-459d-adfb-f400cfd27317";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface TransactionsContextType {
  data: TransactionType[];
  isLoading: boolean; // Adicionado estado de carregamento
  addTransaction: (transaction: TransactionType) => void;
  removeTransaction: (id: string) => void;
}

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactions()
      .then((data: TransactionType[]) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Falha fatal no carregamento inicial:", error);
        setTransactions([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function addTransaction(transaction: TransactionType) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  function removeTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{
        data: transactions,
        isLoading,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
}
