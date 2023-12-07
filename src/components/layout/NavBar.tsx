import { Box, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";
import CartDrawer from "./CartDrawer";

const NavBar = () => {
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const {
    isOpen: isOpenProfileModal,
    onOpen: onOpenProfileModal,
    onClose: onCloseProfileModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCartDrawer,
    onOpen: onOpenCartDrawer,
    onClose: onCloseCartDrawer,
  } = useDisclosure();

  const { user, logout } = useAuth();
  return (
    <Flex
      as="nav"
      align="center"
      w="100%"
      justify="space-between"
      padding={6}
      bg="whiteAlpha.900"
      color="cyan.900"
      borderBottom="2px"
      borderColor="cyan.800"
    >
      <LoginModal
        isOpenLoginModal={isOpenLoginModal}
        onCloseLoginModal={onCloseLoginModal}
      />
      <ProfileModal
        isOpenProfileModal={isOpenProfileModal}
        onCloseProfileModal={onCloseProfileModal}
      />
      <CartDrawer
        isOpenCartDrawer={isOpenCartDrawer}
        onCloseCartDrawer={onCloseCartDrawer}
      />
      <Link to="/">
        <Box>
          <Text fontSize="4xl">Clothing Store</Text>
        </Box>
      </Link>
      <Flex align="center">
        {!user ? (
          <Button
            colorScheme="orange"
            mr={4}
            size="lg"
            onClick={onOpenLoginModal}
          >
            Login
          </Button>
        ) : (
          <Flex>
            <Button colorScheme="orange" size="lg" onClick={logout}>
              Logout
            </Button>
            <Button
              colorScheme="orange"
              mx={4}
              size="lg"
              onClick={onOpenProfileModal}
            >
              Profile
            </Button>
          </Flex>
        )}
        <Button colorScheme="orange" size="lg" onClick={onOpenCartDrawer}>
          Cart
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
