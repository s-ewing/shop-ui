import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

interface ProfileFormProps {
  onCloseProfileModal: () => void;
}

const ProfileForm = ({ onCloseProfileModal }: ProfileFormProps) => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    streetAddress: user?.address?.streetAddress ?? "",
    city: user?.address?.city ?? "",
    state: user?.address?.state ?? "",
    zipCode: user?.address?.zipCode ?? "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jwt = user?.jwt;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        {
          name: formData.name,
          email: formData.email,
          address: {
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      login(response.data);
    } catch (err) {
      axios.isAxiosError(err) && err.response?.status === 409
        ? setErrMsg(err.response.data.message)
        : setErrMsg("Something went wrong.  Try again.");
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="md">
      <Heading size="xl" mb={6}>
        Edit Profile
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isInvalid={errMsg !== ""}>
            <FormErrorMessage mb={2} fontSize="md">
              {errMsg}
            </FormErrorMessage>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Street Address</FormLabel>
            <Input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Zip Code</FormLabel>
            <Input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </FormControl>

          <HStack spacing={4}>
            <Button colorScheme="teal" type="submit">
              Save
            </Button>
            <Button colorScheme="gray" onClick={onCloseProfileModal}>
              Cancel
            </Button>
          </HStack>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileForm;
