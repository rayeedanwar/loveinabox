import axios from "axios";
import { useState } from "react";

import {
  Button,
  Flex,
  Input,
  Spacer,
  useToast, // generic form submission can wrap toast usage too
} from "@chakra-ui/react";
import EmailInput from "../components/Form/EmailInput";
import PhoneInput from "../components/Form/PhoneInput";
import Layout from "./Layout";

const baseURL = "http://localhost:3000/recipients";

export default function RecipientSignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(baseURL, { name, email, number })
      .then(() => {
        toast({
          title: `${name}, you've been added!`,
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Woops! Something went wrong AdminSignUpPage :(");

        // this toast causes app to crash :(((((
        // toast({
        //   title: "Woops!",
        //   description: "Something went wrong :(",
        //   status: "failure",
        //   duration: 9000,
        //   isClosable: true,
        // });
      })
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "number":
        setNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Layout title="Sign up">
      <Flex>
        <form onSubmit={handleOnClick}>
          <Input placeholder="Full name" name="name" onChange={handleChange} />

          <Spacer />
          <br />

          <EmailInput onChange={handleChange} />

          <Spacer />
          <br />

          <PhoneInput onChange={handleChange} />

          <Spacer />
          <br />

          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            onClick={handleOnClick}
          >
            Submit
          </Button>
        </form>
      </Flex>
    </Layout>
  );
}
