import { TransactionKeyType } from ".";

export type TransactionFormType = {
  key: string;
  keyType: TransactionKeyType | null;
  amount: number;
  description: string;
}
