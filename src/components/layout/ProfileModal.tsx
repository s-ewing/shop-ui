import {
  Modal,
  ModalOverlay,
  ModalContent,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import ProfileForm from "../forms/ProfileForm";
import OrderHistory from "../order/OrderHistory";

interface ProfileModalProps {
  isOpenProfileModal: boolean;
  onCloseProfileModal: () => void;
}

const ProfileModal = ({
  isOpenProfileModal,
  onCloseProfileModal,
}: ProfileModalProps) => {
  return (
    <Modal isOpen={isOpenProfileModal} onClose={onCloseProfileModal}>
      <ModalOverlay />
      <ModalContent>
        <Tabs>
          <TabList p={4}>
            <Tab>Profile</Tab>
            <Tab>Orders</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProfileForm onCloseProfileModal={onCloseProfileModal} />
            </TabPanel>
            <TabPanel>
              <OrderHistory />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
