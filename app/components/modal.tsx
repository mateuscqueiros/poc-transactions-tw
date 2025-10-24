"use client";
import { useState, ReactNode } from "react";

type ModalProps = {
  title?: string;
} & React.PropsWithChildren;

export default function Modal({ title = "Confirmação", children }: ModalProps) {
  const [open, setOpen] = useState(false);

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
