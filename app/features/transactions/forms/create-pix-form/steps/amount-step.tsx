"use client";

import { useFormContext, Controller } from "react-hook-form";
import { CurrencyInput } from "@/app/components/forms/currency-input";

export function AmountStep() {
  const {
    control,
    watch,
    formState: { errors },
    register,
  } = useFormContext<any>();

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Valor da transação</h2>

      {/* Valor */}
      <div className="mb-4">
        <label className="block text-md font-medium mb-1">Valor</label>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "O valor é obrigatório",
            min: { value: 0.01, message: "O valor mínimo é R$ 0,01" },
          }}
          render={({ field }) => (
            <CurrencyInput
              {...field}
              value={field.value ?? ""}
              onChange={(val) => field.onChange(val)}
              className={`input input-bordered w-full ${
                errors.amount ? "input-error" : ""
              }`}
            />
          )}
        />

        {errors.amount && (
          <p className="text-sm text-red-500 mt-1">
            {errors.amount.message as string}
          </p>
        )}
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-md font-medium mb-1">Descrição</label>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered w-full"
          placeholder="Opcional"
        />
      </div>
    </div>
  );
}
