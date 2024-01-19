'use client';

import { Button, Modal as UIModal } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';
import { type ElementRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  const onDismiss = () => {
    router.back();
  };

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <UIModal ref={dialogRef}>
      <UIModal.Body>{children}</UIModal.Body>
      <UIModal.Actions>
        <form method="dialog">
          <Button onClick={onDismiss}>Close</Button>
        </form>
      </UIModal.Actions>
    </UIModal>,
    document.getElementById('modal-root')!,
  );
};
