import { useFormContext } from "react-hook-form";
import { TransactionFormType, TransactionKeyType } from "../../../types";
import { formatCurrency, formatKeyType } from "../../../lib/format";

export function ReviewStep() {
  const { watch } = useFormContext<TransactionFormType>();

  const key = watch("key");
  const keyType = watch("keyType");
  const amount = watch("amount");

  const Item = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between text-sm">
      <span className="font-semibold">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">Confirmar destinatário</h2>

      {/* Informações do destinatário */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
          JS
        </div>
        <div>
          <p className="font-bold text-gray-800">João da Silva</p>
          <p className="text-sm text-gray-500">CPF: 300.939.996-07</p>
        </div>
      </div>

      <div className="divider my-2"></div>

      {/* Dados bancários */}
      <div className="flex flex-col gap-1 mb-2">
        <Item label="Banco" value="Banco Itaú • 341" />
        <Item label="Agência" value="7384" />
        <Item label="Conta" value="519440-4" />
        <Item label="Tipo" value="Conta Corrente" />
      </div>

      <div className="divider my-2"></div>

      {/* Chave PIX */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Chave PIX</h3>
        <Item
          label={formatKeyType(keyType as TransactionKeyType)}
          value={key}
        />
      </div>

      {/* Valor */}
      {amount && (
        <div className="border rounded-lg p-4 mt-4 bg-indigo-50">
          <p className="text-sm text-gray-500">Valor a ser transferido</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(amount)}
          </p>
        </div>
      )}
    </div>
  );
}
