import { TransactionClass, TransactionKeyType } from "../types";

export function formatClass(className: TransactionClass) {
  switch (className) {
    case TransactionClass.Pix:
      return "Pix";
    case TransactionClass.Debit:
      return "Débito";
    case TransactionClass.Credit:
      return "Crédito";
    case TransactionClass.Transfer:
      return "Transferência";
    case TransactionClass.Deposit:
      return "Depósito";
  }
}

export function formatKeyType(keyType: TransactionKeyType) {
  switch (keyType) {
    case TransactionKeyType.CPF:
      return "CPF";
    case TransactionKeyType.CNPJ:
      return "CNPJ";
    case TransactionKeyType.Phone:
      return "Telefone";
    case TransactionKeyType.Email:
      return "E-mail";
    case TransactionKeyType.Random:
      return "Chave aleatória";
  }
}

export function formatCurrency(
  value: number,
  locale: string = "pt-BR",
  currency: string = "BRL",
  prefix?: string,
) {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);

  return prefix ? `${prefix} ${formatted}` : formatted;
}
