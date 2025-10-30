'use client';

import { MotionDiv } from '@/components/animations/motion-div';
import { StepControls } from '@/components/step-controls';
import { getLocalStorageValues } from '@/features/transactions/lib/local-storage';
import { getStepIndexFromPathname } from '@/features/transactions/lib/pathname';
import { TransactionFormType } from '@/features/transactions/types';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const FORM_STORAGE_KEY = 'pixTransactionForm';
const BASE_ROUTE_PATH = '/pix/';

const steps = [
  { route: '', fields: ['keyType'] },
  { route: 'input', fields: ['key'] },
  { route: 'amount', fields: ['amount'] },
  { route: 'review', fields: ['key', 'amount'] },
];

export default function CreatePixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>(
    'next'
  );

  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<TransactionFormType>({
    defaultValues: getLocalStorageValues(FORM_STORAGE_KEY) || {
      keyType: null,
      key: '',
      amount: -1,
      description: '',
    },
    mode: 'onBlur',
  });

  const watchedFields = methods.watch();

  const { currentStepIndex, activeStep } = getStepIndexFromPathname(
    pathname,
    steps,
    BASE_ROUTE_PATH
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(watchedFields));
    }
  }, [watchedFields]);

  const prevStep = () => {
    if (currentStepIndex <= 0) return;

    setAnimationDirection('prev');
    const prevStep = steps[currentStepIndex - 1];
    router.replace(BASE_ROUTE_PATH + prevStep.route);
  };

  const nextStep = async () => {
    if (currentStepIndex >= steps.length - 1) return;

    setAnimationDirection('next');
    const fieldsToValidate = steps[currentStepIndex]
      .fields as (keyof TransactionFormType)[];

    const isValid = await methods.trigger(fieldsToValidate);

    if (!isValid) return;

    const nextStep = steps[currentStepIndex + 1];
    router.replace(BASE_ROUTE_PATH + nextStep.route);
  };

  const handleSubmit = () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
    console.log(methods.getValues());
    toast.success('Transação efetuada!');
    router.replace('/');
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col justify-between bg-base-100 rounded-xl w-full max-w-lg mx-auto min-h-[600px]"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={animationDirection}
          >
            {steps.map(
              ({ route }, index) =>
                activeStep === index && (
                  <MotionDiv
                    key={route}
                    motionKey={route}
                    direction={animationDirection}
                  >
                    <div className="space-y-6">{children}</div>
                  </MotionDiv>
                )
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
    </>
  );
}
