"use client";

import { useEffect, useState } from "react";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { TransactionFormType, TransactionKeyType } from "../../../types";
import { inputSchema } from "./input-schemas";

export function InputKeyStep() {
  const {
    watch,
    setValue,
    formState: { errors },
    control,
    clearErrors,
    unregister,
  } = useFormContext<TransactionFormType>();

  const keyType = watch("keyType");

  useEffect(() => {
    if (!keyType) return;

    unregister("key");
    clearErrors("key");
  }, [keyType, setValue, clearErrors, unregister]);

  const config = inputSchema[keyType as TransactionKeyType];
  const { deps, ...rules } = config.validation;

  if (!keyType || !(keyType in inputSchema)) {
    return (
      <p className="text-sm text-gray-500">Escolha o tipo de chave primeiro.</p>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Digite a chave PIX</h2>

      <div className="mt-2">
        <label className="block text-md font-medium mb-1">{config.label}</label>

        <Controller
          name="key"
          control={control}
          rules={rules}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask={config.mask || undefined}
              unmask={true}
              placeholder={config.placeholder}
              onAccept={(val: string) => field.onChange(val)}
              className={`input input-bordered w-full ${errors.key ? "input-error" : ""}`}
            />
          )}
        />

        {errors.key && (
          <p className="text-sm text-red-500 mt-1">{errors.key.message}</p>
        )}
      </div>
    </div>
  );
}
