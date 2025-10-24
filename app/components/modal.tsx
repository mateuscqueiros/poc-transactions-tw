"use client";
import { useState, ReactNode } from "react";

type ModalProps = {
  title?: string;
  children: ReactNode;
  triggerLabel: string;
  confirmLabel?: string;
  onConfirm?: () => void;
} & React.PropsWithChildren;

export default function Modal({
  title = "Confirmação",
  children,
  triggerLabel,
  confirmLabel = "Confirmar",
  onConfirm,
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
            <div className="py-2">{children}</div>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                {confirmLabel}
              </button>
            </div>
          </div>

          <div className="modal-backdrop" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
