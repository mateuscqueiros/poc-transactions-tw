"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { TransactionType } from "../types";
import { transactionsMockData } from "./mock-data";

interface TransactionsContextType {
  data: TransactionType[];
  addTransaction: (transaction: TransactionType) => void;
  removeTransaction: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined,
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] =
    useState<TransactionType[]>(transactionsMockData);

  function addTransaction(transaction: TransactionType) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  function removeTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{ data: transactions, addTransaction, removeTransaction }}
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
