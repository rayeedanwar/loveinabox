import { LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import EmailInput from "../components/Form/EmailInput";
import { useNavigate } from "react-router-dom";

// https://www.shutterstock.com/catalog/collections/3006350397209052217-113cec4ef03f935b287948090217b538127896ceef181767a47610e5f0fd64d2
// pretty sure I read licensing meant whatever I download in the free trial I get to keep

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      textAlign="center"
      width="80vw"
      maxWidth="350px"
      height="60vh"
      margin="20vh auto"
      backgroundColor="teal"
      borderRadius="lg"
    >
      <Box
        bgColor="white"
        height="20vh"
        width="20vh"
        borderRadius="50%"
        backgroundImage="open-box.png"
        backgroundSize="60%"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        margin="auto"
        marginTop="5vh"
      />
      <Spacer />
      <Heading size="2xl" color="white">
        Hello!
      </Heading>

      <Spacer />
      <Flex direction="column" height="20vh" padding="6">
        <EmailInput />
        <Spacer />
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<LockIcon color="gray.300" />}
          />
          <Input placeholder="Password" backgroundColor="white" />
        </InputGroup>
        <Spacer />
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
}
