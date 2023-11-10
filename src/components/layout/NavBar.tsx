import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";

interface NavBarProps {
  onOpenLoginModal: () => void;
  onOpenCartDrawer: () => void;
  onOpenProfileModal: () => void;
}

const NavBar = ({
  onOpenLoginModal,
  onOpenCartDrawer,
  onOpenProfileModal,
}: NavBarProps) => {
  const { user, logout } = useAuth();
  return (
    <Flex
      as="nav"
      align="center"
      w="100%"
      justify="space-between"
      padding={6}
      bg="cyan.800"
      color="white"
      borderBottom="1px"
      borderColor="white"
    >
      <Box>
        <Text fontSize="4xl">Clothing Store</Text>
      </Box>
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
