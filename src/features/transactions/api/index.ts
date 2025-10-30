import { TransactionKeyType, KeyType, TransactionType } from "../types";
import { api } from "@/lib/api";

const keyTypes: KeyType[] = [
  { name: "CPF", value: TransactionKeyType.CPF },
  { name: "CNPJ", value: TransactionKeyType.CNPJ },
  { name: "Telefone", value: TransactionKeyType.Phone },
  { name: "E-mail", value: TransactionKeyType.Email },
  { name: "Chave aleatória", value: TransactionKeyType.Random },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function getKeyTypes(): Promise<KeyType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(keyTypes);
    }, 1000);
  });
}

export async function getTransactions(): Promise<TransactionType[]> {
  const requestPromise = api.get<TransactionType[]>("");
  const delayPromise = delay(1000);
  return Promise.all([requestPromise, delayPromise])
    .then(([response]) => {
      return response.data;
    })
    .catch(error => {
      console.error("Erro ao buscar transações:", error);
      throw new Error("Falha ao carregar dados de transações.");
    });
}
