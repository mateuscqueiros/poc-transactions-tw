"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { TransactionFormType } from "../../types";
import { MotionDiv } from "@/app/components/animations/motion-div";
import { KeyTypeStep } from "./steps";

export type CreatePixFormProps = {
  onSubmitAction: (values: TransactionFormType) => void;
};

const steps = [
  { id: "key-type-step", fields: ["keyType"], component: <KeyTypeStep /> },
];

export function CreatePixForm({ onSubmitAction }: CreatePixFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">(
    "next",
  );

  const methods = useForm<TransactionFormType>({
    defaultValues: {
      keyType: null,
      key: "",
      amount: 0,
      description: "",
    },
    mode: "onBlur",
  });

  const prevStep = () => {
    setAnimationDirection("prev");
    setActiveStep((s) => s - 1);
  };

  const nextStep = async () => {
    setAnimationDirection("next");
    const fieldsToValidate = steps[activeStep]
      .fields as (keyof TransactionFormType)[];
    const isValid = await methods.trigger(fieldsToValidate);
    if (!isValid) return;
    setActiveStep((s) => s + 1);
  };

  const handleSubmit = methods.handleSubmit(
    () => onSubmitAction && onSubmitAction(methods.getValues()),
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto min-h-[420px]"
      >
        {/* Conteúdo animado entre etapas */}
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={animationDirection}
        >
          {steps.map(
            ({ component, id }, index) =>
              activeStep === index && (
                <MotionDiv
                  key={id}
                  motionKey={id}
                  direction={animationDirection}
                >
                  <div className="space-y-6">{component}</div>
                </MotionDiv>
              ),
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center border-t border-base-200 pt-4 mt-6">
          {activeStep > 0 ? (
            <button
              type="button"
              className="btn btn-outline btn-secondary"
              onClick={prevStep}
            >
              Voltar
            </button>
          ) : (
            <div />
          )}

          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextStep}
            >
              Próximo
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Confirmar
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
