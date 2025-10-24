"use client";

import { useRouter } from "next/navigation";
import { CreatePixForm } from "../features/transactions/forms/create-pix-form";

export default function PixPage() {
  const router = useRouter();
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="h-full flex flex-col bg-base-100">
      <CreatePixForm onSubmitAction={handleSubmit} />
    </div>
  );
}
