"use client";

import { CreatePixForm } from "@/features/transactions/forms/create-pix-form";
import { toast } from "sonner";

export default function PixPage() {
  const handleSubmit = (values: any) => {
    console.log(values);
    toast.success("Pagamento efetuado com sucesso");
  };

  return (
    <div className="h-full flex flex-col bg-base-100">
      <CreatePixForm onSubmitAction={handleSubmit} />
    </div>
  );
}
