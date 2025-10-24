/* Tipos de uma transação */
export enum TransactionStatus {
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed',
  Refunded = 'refunded',
  Scheduled = 'scheduled',
}

export enum TransactionKeyType {
  Email = 'email',
  Phone = 'phone',
  CPF = 'cpf',
  CNPJ = 'cnpj',
  Random = 'random',
}

export enum TransactionClass {
  Pix = 'pix',
  Debit = 'debit',
  Credit = 'credit',
  Transfer = 'transfer',
  Deposit = 'deposit',
}

export interface TransactionType {
  id: string;
  description: string;
  class: TransactionClass;
  amount: number;
  createdAt: Date;
  completedAt?: Date;
  status?: TransactionStatus;
  pixKeyType?: TransactionKeyType;
  key: string;
}

/* Tipos para API */
export type CreateTransactionType = Omit<TransactionType,
  'id'
  | 'createdAt'
  | 'completedAt'
  | 'status'
>;

/* Tipos para formulário */
export type TransactionFormType = {
  key: string;
  keyType: TransactionKeyType | null;
  amount: number;
  description: string;
}

