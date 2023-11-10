import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Heading,
  Stack,
  Button,
  Text,
  Flex,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

interface AuthFormProps {
  onCloseLoginModal: () => void;
}

const AuthForm = ({ onCloseLoginModal }: AuthFormProps) => {
  const { login } = useAuth();
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/login`,
          formData
        );
        const user = response.data;
        login(user);
        setErrMsg("");
        onCloseLoginModal();
      } catch (err) {
        axios.isAxiosError(err) && err.response?.status === 401
          ? setErrMsg("Invalid email or password.")
          : setErrMsg("Something went wrong.  Try again.");
      }
    } else {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/new`,
          formData
        );
        setErrMsg("");
        setIsLogin(true);
        toast({
          title: "Account Created.",
          description: "Your account has been created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (err) {
        axios.isAxiosError(err) && err.response?.status === 409
          ? setErrMsg(err.response.data.message)
          : setErrMsg("Something went wrong.  Try again.");
      }
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="md">
      <Heading size="xl" mb={6}>
        {isLogin ? "Login" : "Register"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <FormControl id="email" isRequired isInvalid={errMsg !== ""}>
            <FormErrorMessage mb={2} fontSize="md">
              {errMsg}
            </FormErrorMessage>
            <FormLabel requiredIndicator={<></>}>Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel requiredIndicator={<></>}>Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button colorScheme="orange" type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>
        </Stack>
      </form>

      {isLogin ? (
        <Flex justify="center" my={3}>
          <Text fontSize="lg">
            Need an account?
            <Link
              onClick={() => {
                setIsLogin(!isLogin);
                setErrMsg("");
              }}
              fontSize="lg"
              ml={2}
              color="blue.700"
            >
              Register here
            </Link>
            .
          </Text>
        </Flex>
      ) : (
        <Flex justify="center" my={3}>
          <Text fontSize="lg">
            Already have an account?
            <Link
              onClick={() => {
                setIsLogin(!isLogin);
                setErrMsg("");
              }}
              fontSize="lg"
              color="blue.700"
              ml={2}
            >
              Login here
            </Link>
            .
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default AuthForm;
