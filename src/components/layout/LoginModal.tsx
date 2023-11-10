import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import AuthForm from "../forms/AuthForm";

interface LoginModalProps {
  isOpenLoginModal: boolean;
  onCloseLoginModal: () => void;
}

const LoginModal = ({
  isOpenLoginModal,
  onCloseLoginModal,
}: LoginModalProps) => {
  return (
    <Modal isOpen={isOpenLoginModal} onClose={onCloseLoginModal}>
      <ModalOverlay />
      <ModalContent>
        <AuthForm onCloseLoginModal={onCloseLoginModal} />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
