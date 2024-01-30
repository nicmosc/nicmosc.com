'use client';

import { Button, Modal as UIModal, ModalBody, ModalContent, ModalFooter } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  return (
    <UIModal
      size="5xl"
      defaultOpen
      backdrop="blur"
      onClose={onDismiss}
      portalContainer={document.getElementById('modal-root')!}>
      <ModalContent>
        <ModalBody>
          <div className="p-5">{children}</div>
        </ModalBody>
        <ModalFooter className="justify-between">
          <Button variant="light" onPress={onDismiss}>
            Close
          </Button>
          {/* TODO find another way to trigger this */}
          <Button color="primary" onClick={() => window.location.reload()}>
            View page
          </Button>
        </ModalFooter>
      </ModalContent>
    </UIModal>
  );
};
