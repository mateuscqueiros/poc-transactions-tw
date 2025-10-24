"use client";
import { useFormContext } from "react-hook-form";
import { TransactionFormType, TransactionKeyType } from "../../../types";

const keyTypes = [
  { name: "CPF", value: TransactionKeyType.CPF },
  { name: "CNPJ", value: TransactionKeyType.CNPJ },
  { name: "Telefone", value: TransactionKeyType.Phone },
  { name: "E-mail", value: TransactionKeyType.Email },
  { name: "Chave aleatória", value: TransactionKeyType.Random },
];

export function KeyTypeStep() {
  const {
    watch,
    setValue,
    resetField,
    formState: { errors },
    register,
  } = useFormContext<TransactionFormType>();

  const keyType = watch("keyType");
  register("keyType", { required: "Selecione um tipo de chave" });

  const handleChange = (value: TransactionKeyType) => {
    setValue("keyType", value);
    resetField("key");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Escolha o tipo da chave PIX</h2>

      <div className="grid grid-cols-2 gap-4">
        {keyTypes.map(({ name, value }) => {
          const selected = keyType === value;
          return (
            <label
              key={value}
              className={`card border cursor-pointer transition-all ${
                selected
                  ? "border-primary bg-primary/10 ring-2 ring-primary"
                  : "border-base-300 hover:border-primary/50"
              }`}
              onClick={() => handleChange(value)}
            >
              <div className="card-body flex flex-row justify-between p-4 items-center text-center">
                <span
                  className={`font-medium ${
                    selected ? "text-primary" : "text-base-content"
                  }`}
                >
                  {name}
                </span>

                <input
                  type="radio"
                  value={value}
                  {...register("keyType")}
                  checked={selected}
                  onChange={() => handleChange(value)}
                  className="radio radio-primary"
                />
              </div>
            </label>
          );
        })}
      </div>

      {errors.keyType && (
        <p className="text-error text-sm">{errors.keyType.message}</p>
      )}
    </div>
  );
}
