'use client'

import { useEffect, useRef } from "react";

export default function Modal({ openModal, closeModal, children }:{openModal:boolean, closeModal:() => void, children:React.ReactNode}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
        className=" mx-auto my-auto p-4 rounded-lg shadow-xl backdrop:bg-gray-400/50 bg-background text-foreground"
        ref={ref}
        onCancel={closeModal}
    >
      {children}
      <button onClick={closeModal}>
        Close
      </button>
    </dialog>
  );
}