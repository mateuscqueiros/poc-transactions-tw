"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { TransactionFormType } from "../../types";
import { MotionDiv } from "@/components/animations/motion-div";
import { KeyTypeStep, InputKeyStep, ReviewStep, AmountStep } from "./steps";
import { StepControls } from "./step-controls";

export type CreatePixFormProps = {
  onSubmitAction: (values: TransactionFormType) => void;
};

const steps = [
  { id: "key-type-step", fields: ["keyType"], component: <KeyTypeStep /> },
  { id: "input-key-step", fields: ["key"], component: <InputKeyStep /> },
  { id: "amount-step", fields: ["amount"], component: <AmountStep /> },
  { id: "review-step", fields: ["key", "amount"], component: <ReviewStep /> },
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
        className="flex flex-col justify-between bg-base-100 rounded-xl w-full max-w-lg mx-auto min-h-[600px]"
      >
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

        <StepControls
          active={activeStep}
          total={steps.length}
          onNext={nextStep}
          onPrev={prevStep}
        />
      </form>
    </FormProvider>
  );
}
