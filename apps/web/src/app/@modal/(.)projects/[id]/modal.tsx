'use client';

import {
  Button,
  Modal as UIModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nicmosc/ui';
import { useRouter } from 'next/navigation';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  return (
    <UIModal
      defaultOpen
      backdrop="blur"
      onClose={onDismiss}
      portalContainer={document.getElementById('modal-root')!}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter className="justify-between">
          <Button color="danger" variant="light" onPress={onDismiss}>
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
